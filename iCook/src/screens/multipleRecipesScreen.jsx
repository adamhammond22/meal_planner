/* MultipleRecipesScreen.jsx contains the MultipleRecipesScreen component, used to view a all recipes */

// import react states
import React, { useState, useEffect } from 'react'
//import react native components
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
// import empty recipe loader
import { LoadEmptyRecipe } from './viewRecipeScreen';
// import homepage style sheet
import {homeStyles} from '../styleSheets/homepageStyle';
/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';
/* Import custom searchbar */
import { CustomSearchBar } from '../components/Searchbar';
/* Import Fake Recipes */
import { fakeRecipes } from '../../assets/fakeRecipes';
// Import loadFonts from the global Style Sheet
import { loadFonts } from '../styleSheets/globalStyle';


/* Init SQLite database obj */
const db = SQLite.openDatabase('recipe.db');


/* ========== Helper Function ========== */

/* Boolean Function - if ANY recipe field includes this string, return true, otherwise false */
function recipeIncludesString(recipe, string) {
  const {name, description, ingredients, instructions, tags} = recipe
  if( (name != null && name.toLowerCase().includes(string)) ||
    (description != null && description.toLowerCase().includes(string)) ||
    (ingredients != null && ingredients.toLowerCase().includes(string)) ||
    (instructions != null && instructions.toLowerCase().includes(string)) ||
    (tags != null && tags.toLowerCase().includes(string))
  ) {
    return true

  } else {
    return false
  }
}

/* Boolean function returning True if all queries in the queryList show up in the recipe*/
function recipeContainsQueries(recipe, queryList) {
  //iterate over all queries
  for (const query of queryList) {
    // if one of the queries does NOT show up anywhere in the recipe, this recipe should be filtered out
    if(!recipeIncludesString(recipe, query)) {
      return false
    }
  }
  // at this point- all queries show up in the recipe, do not filter
  return true
}

/* Boolean function returning True if a SINGLE query in the queryList is included in the name*/
function recipeNameContainsQueries(recipe, queryList) {
  const recipeName = recipe.name
  //iterate over all queries
  for (const query of queryList) {

    // if one of the queries appears in the name, return true
    if(recipeName != null && recipeName.toLowerCase().includes(query)) {
      return true
    }
  }
  //at this point, no queries show up in the name, return false
  return false
}




/* ========== MultipleRecipesScreen Component ========== */

/* All Recipes Screen takes a navigation prop, and returns jsx  */
const MultipleRecipesScreen = ({navigation}) => {

  /* ========== States and Effects ========== */

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    CreateTable()
  }, []);

  /* isLoading is true if we're currently loading our list of recipes */
  const [isLoading, setIsLoading] = useState(true);

  /* Loaded recipes is the state containing the list of currently loaded recipes, we may need ot limit the 
  size of recipes (in the case the user has like 500 recipes) */
  const [loadedRecipes, setLoadedRecipes] = useState([]);

  /* Shown recipes is the state containing the list of currently shown recipes, this is what the search function modifies */
  const [shownRecipes, setShownRecipes] = useState([]);


  /* Load our fonts */
  loadFonts();

  /* ========== Helper Functions ========== */

  // SQLLite function to creat a table if it doesn't exist
  const CreateTable = () =>{
    db.transaction(tx => {
      tx.executeSql(
        /* ingredients is currently set to store a TEXT type, as I expect us to parse them into a text, but we can 
        change the data type if there's something better */
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT, image BLOB, tags TEXT);',
        [],
        () => loadRecipes()
      );
    });
  }

  /* Navigation function that takes a recipe id or null, and properly routing to the desired screen */
  const navigateToRecipe = (id) => {

    /* If the ID is null, we need to create a new recipe */
    if (id == null) {
      /* Attempt Creating a new Recipe */
      addRecipe('New Recipe')
        /* Upon success, navigate to edit screen*/
        .then((newRecipeId) => {
          navigation.replace('Edit-Recipe', { recipeId: newRecipeId , nullLoad: true});
        })
        /* Upon failure, remain on this screen*/
        .catch((error) => {
          console.log('MultipleRecipesScreen.jsx: Error adding recipe:', error);
        });
    
    /* If the ID is non-null, navigate to view it */
    } else{
      LoadEmptyRecipe(id)
      navigation.replace('View-Recipe', { recipeId: id, preLoaded: false})
    }
  } 

  // This function completely wipes the table to fully reset. Good for "no coloum named XXX" error if you're change the inital table
  const DEBUG_DELETE_TABLE = () => {
    console.log("TABLE DROPPED")
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE Recipes;',
        null,
        CreateTable()
      );
    });
  }

  // This Function adds a large list of dummy recipes from fakeRecipes.jsx into the database
  const DEBUG_ADD_RECIPES = () => {
    for (const rec of fakeRecipes) {
      new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO Recipes (name, description, ingredients, instructions, image, tags) values (?, ?, ?, ?, ?, ?)', [rec.name, rec.desc, rec.ingr, rec.inst, null, rec.tag], 
          (_, { insertId }) => resolve(insertId),
          (_, error) => reject(error)
          );
        }, null,null);
      });  
    }
    loadRecipes();
  }


  /* SQLLite Function that selects all Recipes from database.
  Updates the Recipes state and setsIsLoading state to false when completed */
  const loadRecipes = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Recipes', [],
        (_, results) => {
          var recipesList = [];
          for (let i = 0; i < results.rows.length; ++i)
            recipesList.push(results.rows.item(i));
        
          /* When the callback is completed, update our 2 states */
          setLoadedRecipes(recipesList);
          setShownRecipes(recipesList);
          setIsLoading(false);
        });
        (_, error) => console.log("MultipleRecipesScreen.jsx: loadRecipes() error: ", error) // Error callback
    });
  };

  /* SQLLite Function that adds the given recipe name with a promise to return the new id */
  const addRecipe = (recipeName) => {
    
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO Recipes (name, image, description, ingredients, instructions, tags) values (?, ?, ?, ?, ?, ?)', [recipeName, null, '', '' , '', ''], 
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
        );
      },
      null,
      null
      );
    });
  };

  /* SQLite function to delete a recipe from the db */
  const deleteRecipe = (recipeId) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM Recipes where id = ?;`, [recipeId]);
      },
      null,
      loadRecipes
    );
  };

  const deleteAlert = (recipeId) => {
    Alert.alert('Delete Recipe?', 'Are you sure you want to delete this recipe?', 
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => deleteRecipe(recipeId),
        style: 'ok'
      },
    ],)
  }


  /* Function to handle a change to the search input, it takes the searchInputList of strings and sets the "filtered recipes" state
  accordingly  */
  const handleSearchInputChange = (searchInputList) => {
    // map our search inputs to lowercase
    const lowerCaseInputList = searchInputList.map((item) => item.toLowerCase()) 

    /* Custom sorting function to prioritize recipes with the search in the name field, and then alphabetically sort otherwise */
    function customSearchSort(a, b) {

      const aContainsQueryInName = recipeNameContainsQueries(a, lowerCaseInputList)
      const bContainsQueryInName = recipeNameContainsQueries(b, lowerCaseInputList)

      if (aContainsQueryInName && !bContainsQueryInName) {
        return -1 // -1 will ensure A stays in front of B

      } else if (!aContainsQueryInName && bContainsQueryInName) {
        return 1 // 1 will ensure B gets swapped in front of A

      /* Otherwise evaluate alphabetically by casting to numbers and subtracting b from a*/
      } else {
        return a.name[0].localeCompare(b.name[0])
      }
    }
  
    /* Check that the search input is non-empty  */
    if(lowerCaseInputList.length > 0) {
       /* Filter out entries with no matches in any field */
      const filteredRecipes = loadedRecipes.filter(recipe => {
        return(recipeContainsQueries(recipe, lowerCaseInputList))
      });
      /* Sort the filtered recipes by the custom sort function */
      filteredRecipes.sort(customSearchSort);
      /* Update the shown recipes state to reflect our new search*/
      setShownRecipes(filteredRecipes);
    
    /* Check if the search input is empty, simply show all recipes  */
    } else {
      setShownRecipes(loadedRecipes);
    }
  }


  /* ========== Rendering & Returing JSX ========== */

  function formatTags(tagString) {
    if (tagString==null || tagString =='') {
      return '(No Tags)'
    }
    tagArray = tagString.split("@")
    formattedString = 'Tags: '
    firstTag = true
    tagArray.forEach((tag) => {
      if(tag == '') {
        return formattedString
      }
      if(firstTag) {
        formattedString += tag
        firstTag = false
      }
      else {
        formattedString += ' | ' + tag
      }
      
    })
    return formattedString
  }

  /* Function rendering a single database item into jsx */
  const renderRecipes = ({ item }) => (
    <TouchableOpacity  style={homeStyles.recipeWrapper}
    onPress={() => navigateToRecipe(item.id)} >
      
      <Text style={homeStyles.recipe}>{item.name}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={homeStyles.descripText}>{item.description}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={homeStyles.descripText}>{formatTags(item.tags)}</Text>

      <View style={homeStyles.recipeButtonRowStyle}>

        {/* Add To Shopping Button */}
        <TouchableOpacity onPress={() => console.log("not implemented!")}>
          <Text style={[homeStyles.recipeButton]} >Add to Shopping</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity onPress={() => deleteAlert(item.id)}>
          <Text style={[homeStyles.recipeButton]}> Delete </Text>
        </TouchableOpacity>

      </View>

    </TouchableOpacity >
  );

  /* If Loading, simply show that we're loading */
  if (isLoading) {
    return (
      <SafeAreaView>
        <View style={homeStyles.loading}>
          <Text>Loading recipes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  /* Otherwise, render the whole multi recipe screen */
  return (
    
      <SafeAreaView style={homeStyles.home}>

        {/* Debug Buttons Area */}
        <View style = {homeStyles.debugEndLineStyle}>

          {/* <Button title="Delete EVERYTHING (debug)" onPress={() => DEBUG_DELETE_TABLE()} /> */}
          <TouchableOpacity onPress={() => DEBUG_DELETE_TABLE()}>

            {/* style for now */}
            <Text style={homeStyles.debugDeleteStyle}> DELETE EVERYTHING (DEBUG)</Text>
          </TouchableOpacity>

          {/* <Button title="Delete EVERYTHING (debug)" onPress={() => DEBUG_DELETE_TABLE()} /> */}
          <TouchableOpacity onPress={() => DEBUG_ADD_RECIPES()}>

            {/* style for now */}
            <Text style={homeStyles.debugAddStyle}> ADD RECIPES (DEBUG)</Text>

          </TouchableOpacity>

        </View>


        <Text style={homeStyles.title}>Recipes</Text>

        {/* Custom Search Bar */}
        <CustomSearchBar onInputChange={handleSearchInputChange} inputStyle={homeStyles.searchBarInputStyle}/>
        <View style={homeStyles.searchBarBufferStyle}></View>

        {/* Render our recipes in a list */}
        <FlatList
        data={shownRecipes}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderRecipes}
        />

        {/* <Button title={"New Recipe"} onPress= {() => navigateToRecipe(null) } /> */}
        <TouchableOpacity onPress= {() => navigateToRecipe(null) }>
          <Text style={[homeStyles.button, homeStyles.newRecipeButtonAdditionsStyle]}> Adds New Recipe </Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}

export default MultipleRecipesScreen;