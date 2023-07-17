/* MultipleRecipesScreen.jsx contains the MultipleRecipesScreen component, used to view a all recipes */

// import react states
import React, { useState, useEffect } from 'react'
//import react native components
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
// import function for expo-font
import { useFonts } from 'expo-font';
// import empty recipe loader
import { LoadEmptyRecipe } from '../viewRecipe';
// import homepage style sheet
import {styles} from '../homepageStyle';
/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';
/* Import custom searchbar */
import { CustomSearchBar } from '../components/Searchbar';
/* Import Fake Recipes */
import { fakeRecipes } from '../../assets/fakeRecipes';

/* Init SQLite database obj */
const db = SQLite.openDatabase('recipe.db');

/* All Recipes Screen takes a navigation prop, and returns jsx*/
const MultipleRecipesScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
    
  /* isLoading is true if we're currently loading our list of recipes */
  const [isLoading, setIsLoading] = useState(true);

  /* Loaded recipes is the state containing the list of currently loaded recipes, we may need ot limit the size of recipes (in the case the user has like 500 recipes) */
  const [loadedRecipes, setLoadedRecipes] = useState([]);

  /* Shown recipes is the state containing the list of currently shown recipes, this is what the search function modifies */
  const [shownRecipes, setShownRecipes] = useState([]);

  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    CreateTable()
  }, []);

  /* Load our fonts */
  const [fontsLoaded] = useFonts({
    'Orienta': require('../../assets/fonts/Orienta-Regular.ttf'),
  });


  // Separated out of useEffect so that it could be called by DEBUG_DELETE_TABLE
  const CreateTable = () =>{
    db.transaction(tx => {
      tx.executeSql(
        // ingredients is currently set to store a TEXT type, as I expect us to parse them into a text, but we can change the data type if there's something better
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT, image BLOB);',
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
          console.log('Error adding recipe:', error);
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


  const DEBUG_ADD_RECIPES = () => {
    
    for (const rec of fakeRecipes) {
      new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO Recipes (name, description, ingredients, instructions, image) values (?, ?, ?, ?, ?)', [rec.name, rec.desc, rec.ingr, rec.inst, null], 
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
        (_, error) => console.log("App.js: loadRecipes() error: ", error) // Error callback
    });
  };

  /* SQLLite Function that adds the given recipe name with a promise to return the new id */
  const addRecipe = (recipeName) => {
    
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        //tx.executeSql('INSERT INTO Recipes (name, description, ingredients, instructions) values (?, ?, ?, ?)', [recipeName, '', [], ''], 
        tx.executeSql('INSERT INTO Recipes (name, description, ingredients, instructions) values (?, ?, ?, ?)', [recipeName, ' ', '' , ''], 
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
  const deleteRecipe = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM Recipes where id = ?;`, [id]);
      },
      null,
      loadRecipes
    );
  };


  /* Function rendering a single database item into jsx */
  const renderRecipes = ({ item }) => (
    <TouchableOpacity  style={styles.recipeWrapper}
    onPress={() => navigateToRecipe(item.id)} >
      
      <Text style={styles.recipe}>{item.name}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.descripText}>{item.description}</Text>

      <View style={[styles.buttons, {flexDirection:'row'}, {margin: 10}, {justifyContent:'center'}]}>
        {/* <Button title="Add to Shopping" onPress={() => console.log("not implemented!")} /> */}
        <TouchableOpacity onPress={() => console.log("not implemented!")}>
          <Text style={[styles.recipeButton, {alignSelf:'flex-end'}, {justifyContent:'center'},{padding:10}  ]} >Add to Shopping</Text>
        </TouchableOpacity>
        {/* <Button title="Delete" onPress={() => deleteRecipe(item.id)} /> */}
         {/* <TouchableOpacity onPress={() => deleteAlert(item.id)}>  */}
         {/* <TouchableOpacity onPress={() => deleteRecipe(item.id)}> */}
         <TouchableOpacity onPress={() =>
      Alert.alert('Delete Recipe?', 'Are you sure you want to delete this recipe?', 
      [
        {
          text: 'Cancel',
          onPress:() => console.log("Cancel: "),
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deleteRecipe(item.id),
          style: 'ok'
        },
      ],
      )}
      >
          <Text style={[styles.recipeButton, {alignSelf:'flex-end'}, {justifyContent:'center'},{padding:10}  ]}> Delete </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity >
  );


  /* Function to handle a change to the search input, it takes the searchInput string and sets the "filtered recipes" state
  accordingly  */
  const handleSearchInputChange = (searchInput) => {

    const lowerCaseInput = searchInput.toLowerCase() //our lowercase search input

    /* Custom sorting function to prioritize recipes with the search in the name field, and then alphabetically sort otherwise */
    function customSearchSort(a, b) {
      const lowerCaseNameA = a.name.toLowerCase()
      const lowerCaseNameB = b.name.toLowerCase()

      /* If only the a name includes the search query */
      if (lowerCaseNameA.includes(lowerCaseInput) && !(lowerCaseNameB.toLowerCase().includes(lowerCaseInput))) {
        return -1 // -1 will ensure A stays in front of B

      /* If only the b name includes the search query */
      } else if (!(lowerCaseNameA.includes(lowerCaseInput)) && lowerCaseNameB.toLowerCase().includes(lowerCaseInput)) {
        return 1 // 1 will ensure B gets swapped in front of A

      /* Otherwise evaluate alphabetically by casting to numbers and subtracting b from a*/
      } else {
        return Number(a.name) - Number(b.name)
      }
    }
  
    /* Sanity check that the search input is a string */
    if(typeof(searchInput) === 'string') {

      const lowerCaseInput = searchInput.toLowerCase()

       /* Filter out entries with no matches in any field */
      const filteredRecipes = loadedRecipes.filter(recipe => {
        const {name, description, ingredients, instructions} = recipe
        return (name.toLowerCase().includes(lowerCaseInput) || description.toLowerCase().includes(lowerCaseInput) ||
          ingredients.toLowerCase().includes(lowerCaseInput) || instructions.toLowerCase().includes(lowerCaseInput))
      });
      /* Sort the filtered recipes by the custom sort function */
      filteredRecipes.sort(customSearchSort);
      /* Update the shown recipes state to reflect our new search*/
      setShownRecipes(filteredRecipes);
      
    }
  }



  /* If Loading, simply show that we're loading */
  if (isLoading || !fontsLoaded) {
    return (
      <SafeAreaView>
        <View style={styles.loading}>
          <Text>Loading recipes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  /* Otherwise, render the whole multi recipe screen */
  return (
    
      <SafeAreaView style={styles.home}>
      {/* <View style={styles.recipeWrapper}> */}
          {/* <Button title="Delete EVERYTHING (debug)" onPress={() => DEBUG_DELETE_TABLE()} /> */}
          <TouchableOpacity onPress={() => DEBUG_DELETE_TABLE()}>
            {/* style for now */}
            <Text style={[{color:'red'}, {textAlign:'center'}, {fontSize:20}]}> Delete Everything (DEBUG)</Text>
          </TouchableOpacity>
          {/* <Button title="Delete EVERYTHING (debug)" onPress={() => DEBUG_DELETE_TABLE()} /> */}
          <TouchableOpacity onPress={() => DEBUG_ADD_RECIPES()}>
            {/* style for now */}
            <Text style={[{color:'orange'}, {fontSize:20}]}> ADD RECIPES (DEBUG)</Text>
          </TouchableOpacity>
          {/* Custom Search Bar */}
          <CustomSearchBar onInputChange={handleSearchInputChange}/>
          <Text style={styles.title}>All Recipes</Text>
          
          {/* Render our recipes in a list */}
          <FlatList
          data={shownRecipes}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderRecipes}
          />

          {/* <Button title={"New Recipe"} onPress= {() => navigateToRecipe(null) } /> */}
          <TouchableOpacity onPress= {() => navigateToRecipe(null) }>
            <Text style={[styles.button, {textAlign:'center'}, {paddingBottom: 50}]}> Adds New Recipe </Text>
          </TouchableOpacity>
      {/* </View> */}
      </SafeAreaView>
  )
}

export default MultipleRecipesScreen;