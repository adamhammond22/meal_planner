import { StyleSheet, SafeAreaView, Text, View, Button, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'

import React, { useState, useEffect } from 'react'

import { LoadEmptyRecipe } from '../viewRecipe';

/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';

/* Init SQLite database obj */
const db = SQLite.openDatabase('recipe.db');


/* All Recipes Screen takes a navigation prop, and returns jsx*/
const MultipleRecipesScreen = ({navigation}) => {
  
  /* isLoading is true if we're currently loading our list of recipes */
  const [isLoading, setIsLoading] = useState(true);

  /* Recipes is the state containing the list of currently loaded recipes, we may need ot limit the size of recipes (in the case the user has like 500 recipes) */
  const [recipes, setRecipes] = useState([]);


  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
        [],
        () => loadRecipes()
      );
    });
  }, []);

  /* Navigation function that takes a recipe id or null, and properly routing to the desired screen */
  const navigateToRecipe = (id) => {
    console.log("attempting to navigate to id: ", id)

    /* If the ID is null, we need to create a new recipe */
    if (id == null) {
      console.log("creating new recipe")
      /* Attempt Creating a new Recipe */
      addRecipe('New Recipe')
        /* Upon success, navigate to edit screen*/
        .then((newRecipeId) => {
          console.log('New recipe created with ID:', newRecipeId);
          console.log("navigating to view recipe");
          navigation.replace('Edit-Recipe', { recipeId: newRecipeId , nullLoad: true});
        })
        /* Upon failure, remain on this screen*/
        .catch((error) => {
          console.log('Error adding recipe:', error);
        });
    
    /* If the ID is non-null, navigate to view it */
    } else{
      console.log("navigating to view recipe")
      LoadEmptyRecipe(id)
      navigation.replace('View-Recipe', { recipeId: id, preLoaded: false})
    }
  } 

  /* SQLLite Function that selects all Recipes from database.
  Updates the Recipes state and setsIsLoading state to false when completed */
  const loadRecipes = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Recipes', [],
        (tx, results) => {
          var recipesList = [];
          for (let i = 0; i < results.rows.length; ++i)
            recipesList.push(results.rows.item(i));
        
          /* When the callback is completed, update our 2 states */
          setRecipes(recipesList);
          setIsLoading(false);
        });
        (tx, error) => console.log("App.js: loadRecipes() error: ", error) // Error callback
    });
  };

  /* SQLLite Function that adds the given recipe name with a promise to return the new id */
  const addRecipe = (recipeName) => {
    console.log(" in add recipe:, name", recipeName)
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO Recipes (name) values (?)', [recipeName], 
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
        );
      },
      null,
      null
      );
    });
  };

  /* Function rendering a single database item into jsx */
  const renderRecipes = ({ item }) => (
    <TouchableOpacity  style={styles.listItem}
    onPress={() => navigateToRecipe(item.id)} >
      <Text style={styles.listItemText}>{item.name}</Text>
      <View style={styles.buttons}>
        <Button title="Add to Shopping" onPress={() => console.log("not implemented!")} />
        <Button title="Delete" onPress={() => deleteRecipe(item.id)} />
      </View>
    </TouchableOpacity >
  );

const deleteRecipe = (id) => {
  db.transaction(
    tx => {
      tx.executeSql(`DELETE FROM Recipes where id = ?;`, [id]);
    },
    null,
    loadRecipes
  );
};

  /* If Loading, simply show that we're loading */
  if (isLoading) {
    return (
      <SafeAreaView>
        <View style={styles.loading}>
          <Text>Loading recipes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  /* Otherwise, render the whole thing */
  return (
      <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
          <Text style={styles.title}>All Recipes</Text>
          
          {/* Render our recipes in a list */}
          <FlatList
          data={recipes}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderRecipes}
          />

          <Button title={"New Recipe"} onPress= {() => navigateToRecipe(null) } />
      </View>
      </SafeAreaView>
  )

}





/* Stylesheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 16,
  },
  wrapper: {
    flex: 1
  },
  loading:{
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 16,
    paddingLeft: 8,
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray'
  },
  listItemText: {
    fontSize: 18,
    width: '60%',  // Limit the width of the name display
    paddingRight: 10, // Add some padding to the right
  },
  buttons: {
    flexDirection: 'row',
    width: '30%', // Allow room for buttons
  },
  navigationOptions: {
    // This removes the previous page from the stack button from the app
    headerLeft: null
  },
});

export default MultipleRecipesScreen;