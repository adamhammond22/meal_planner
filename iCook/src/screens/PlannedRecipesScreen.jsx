/* PlannedRecipesScreen.jsx contains the PlannedRecipeScreen component used to view our planned recipes */

import React, { useState, useEffect } from 'react'
//import react native components
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';
// importing icons
import Icon from 'react-native-vector-icons/AntDesign';
// import seperates stylesheer
import { plannedRecipeStyles } from '../styleSheets/plannedRecipeStyle';
//import formatTags function from helpers
import { formatTags } from '../components/Helpers';

/* Init SQLite database obj */
const db = SQLite.openDatabase('recipe.db');

/* PlannedRecipeScreen returns JSX to render our screen, and takes a naviation prop */
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


  /* Function that handles the button press of 'send to shopping' */
  const handleSendToShopping = () => {
    console.log("Here, we handle sending to shopping!")
  }

  /* Function that handles the button press of 'clear planned recipes' */
  const handleClearPlannedRecipes = () => {
    Alert.alert('Clear Planned Recipes?', 'Are you sure you want to clear your planned recipes?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes, Clear Planned Recipes',
        onPress: () => clearPlannedRecipes(),
        style: 'ok'
      },
    ]);
  }

  /* Sqllite function to set all inCart fields to 0, and call a reloading of the recipes. This
  will effectively clear the planned recipes */
  const clearPlannedRecipes = () => {
    db.transaction (
      tx => {
        tx.executeSql(`UPDATE Recipes SET inCart = 0 WHERE inCart > 0`,
        [], () => loadPlannedRecipes());
      },
    );
  }

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

  /* ========== Rendering & Returing JSX ========== */

  /* Function rendering a single database item into jsx */
  const renderPlannedRecipes = ({ item }) => (
    
    <View  style={plannedRecipeStyles.recipeWrapperStyle}>
      <View style={plannedRecipeStyles.recipeInfoContainerStyle}>
        <Text style={plannedRecipeStyles.recipeStyle}>{item.name}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={plannedRecipeStyles.descripTextStyle}>{item.description}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={plannedRecipeStyles.descripTextStyle}>{formatTags(item.tags)}</Text>
      </View>
      <View style={plannedRecipeStyles.inCartContainerStyle}>
          {/* Increment Button */}
        <TouchableOpacity onPress={() => incrementRecipeInCart(item.id)} style={plannedRecipeStyles.inCartButtonStyle}>
          <Icon name='up' size={25}  style={plannedRecipeStyles.inCartIconStyle}/>
        </TouchableOpacity>
        <View>
          <Text style={plannedRecipeStyles.inCartTextStyle}>{item.inCart}</Text>
        </View>
        {/* Decrement Button  */}
        <TouchableOpacity onPress={() => decrementRecipeInCart(item.id)} style={plannedRecipeStyles.inCartButtonStyle}>
          <Icon name='down' size={25} style={plannedRecipeStyles.inCartIconStyle}/>
        </TouchableOpacity>
      </View>
    </View >
  );

  /* This Function renders our footer button, which clears our planned recipes */
  const clearPlannedRecipesFooter = () => {
    if(plannedRecipes.length > 0) {
    return (
      <TouchableOpacity style={plannedRecipeStyles.clearPlannedRecipesStyle}
        onPress={() => handleClearPlannedRecipes()} >
        <Text style={plannedRecipeStyles.sendToShoppingTextStyle}>
          Clear Planned Recipes
        </Text>
        <Icon name='close' size={25} style={plannedRecipeStyles.clearPlannedRecipesIconStyle}/>
      </TouchableOpacity>
    )
    } else {
      return null
    }
  }

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

  /* Otherwise returin our normal JSX */
  return (
    <View style={plannedRecipeStyles.mainContainerStyle}>

      <TouchableOpacity style={plannedRecipeStyles.sendToShoppingStyle}
        onPress={() => handleSendToShopping()}>
        <Text style={plannedRecipeStyles.sendToShoppingTextStyle}>
          Send to Shopping List
        </Text>
        <Icon name='shoppingcart' size={25} style={plannedRecipeStyles.sendToShoppingIconStyle}/>
      </TouchableOpacity>

      {/* Render our recipes in a list */}
      <View style={plannedRecipeStyles.flatListContainerStyle}>
        <FlatList
          data={plannedRecipes}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderPlannedRecipes}
          ListFooterComponent={clearPlannedRecipesFooter}
        />
      </View>  
    </View>
  );
}