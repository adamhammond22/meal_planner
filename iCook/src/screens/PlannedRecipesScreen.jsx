import React, { useState, useEffect } from 'react'
//import react native components
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';

import Icon from 'react-native-vector-icons/AntDesign';

import { plannedRecipeStyles } from '../styleSheets/plannedRecipeStyle';

import { formatTags } from '../components/Helpers';

/* Init SQLite database obj */
const db = SQLite.openDatabase('recipe.db');


export default function PlannedRecipeScreen ({navigation}) {

  /* ========== States and Effects ========== */

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: true});
  }, [navigation]);

  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadPlannedRecipes() */
  useEffect(() => {
    console.log("Creating")
    CreateTable()
  }, []);
  
  /* isLoading is true if we're currently loading our list of planned recipes */
  const [isLoading, setIsLoading] = useState(true);

  /* plannedRecipes is the state containing the list of items in the plannedRecipes */
  const [plannedRecipes, setPlannedRecipes] = useState([]);
  /* ========== Helper Functions ========== */

  // SQLLite function to create a table if it doesn't exist
  const CreateTable = () =>{
    db.transaction(tx => {
      tx.executeSql(
        /* ingredients is currently set to store a TEXT type, as I expect us to parse them into a text, but we can 
        change the data type if there's something better */
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT, image BLOB, tags TEXT, inCart INTEGER);',
        [],
        () => loadPlannedRecipes()
      );
    });
  }

  /* SQLLite Function that loads all Recipes with nonZero inCart fields from the DB
  Updates the plannedRecipes state and setsIsLoading state to false when completed */
  const loadPlannedRecipes = () => {
    console.log("loading planned recipes")
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Recipes WHERE inCart > 0;', [],
        (_, results) => {
          var recipesList = [];
          for (let i = 0; i < results.rows.length; ++i) {
            recipesList.push(results.rows.item(i));
          }
          /* When the callback is completed, update our 2 states */
          setPlannedRecipes(recipesList);
          setIsLoading(false);
        });
        (_, error) => console.log("PlannedRecipesScreen.jsx: loadPlannedRecipes() error: ", error) // Error callback
    });
  };

  /*SQLite Function that updates the given recipe id, incrementing inCart by 1 */
  const incrementRecipeInCart = (givenRecipeId) => {
    console.log("incrementing")
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET inCart = inCart + 1 WHERE id = ?`,
        [givenRecipeId], () => loadPlannedRecipes());
      },
    );
  };

  /*SQLite Function that updates the given recipe id, decrementing inCart by 1 */
  const decrementRecipeInCart = (givenRecipeId) => {
    console.log("decrimenting")
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET inCart = inCart - 1 WHERE id = ?`,
        [givenRecipeId], () => loadPlannedRecipes());
      },
    );
  };

  const DEBUG_ADD_PLANNED = () => {
    console.log("Adding planned")
  }


  /* ========== Rendering & Returing JSX ========== */

  /* Function rendering a single database item into jsx */
  const renderPlannedRecipes = ({ item }) => (
    
    <View  style={plannedRecipeStyles.recipeWrapper}>
      <View style={plannedRecipeStyles.recipeInfoContainer}>
        <Text style={plannedRecipeStyles.recipe}>{item.name}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={plannedRecipeStyles.descripText}>{item.description}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={plannedRecipeStyles.descripText}>{formatTags(item.tags)}</Text>
      </View>
      <View style={plannedRecipeStyles.inCartContainer}>
          {/* Increment Button */}
        <TouchableOpacity onPress={() => incrementRecipeInCart(item.id)} style={plannedRecipeStyles.inCartButton}>
          <Icon name='up' size={25}  style={plannedRecipeStyles.iconStyle}/>
        </TouchableOpacity>
        <View>
          <Text style={plannedRecipeStyles.inCartText}>{item.inCart}</Text>
        </View>
        {/* Decrement Button  */}
        <TouchableOpacity onPress={() => decrementRecipeInCart(item.id)} style={plannedRecipeStyles.inCartButton}>
          <Icon name='down' size={25} style={plannedRecipeStyles.iconStyle}/>
        </TouchableOpacity>
      </View>
    </View >
  );



  /* If Loading, simply show that we're loading */
  if (isLoading) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading recipes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={plannedRecipeStyles.mainContainerStyle}>


        {/* Render our recipes in a list */}
        <FlatList
          data={plannedRecipes}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderPlannedRecipes}
        />

    </View>
  );
}