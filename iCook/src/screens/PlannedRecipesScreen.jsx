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

import { Unit, IngredientToText } from './viewRecipeScreen';



/* Init SQLite database obj */
const db = SQLite.openDatabase('recipe.db');

/* Init SQLite database obj */
const shoppingdb = SQLite.openDatabase('shoppingList.db');

const UnitConversion = [
  // Whole to Whole
  {conversionMult: 1, newUnit: 0, minNewUnitConvert: -1},
  // Teaspoon to Tablespoon
  {conversionMult: 3, newUnit: 2, minNewUnitConvert: 1},
  // Tablespoon to Fl Oz
  {conversionMult: 2, newUnit: 3, minNewUnitConvert: 0.125},
  // Fl OZ to Cup
  {conversionMult: 8, newUnit: 4, minNewUnitConvert: 0.125},
  // Cups to Pint
  {conversionMult: 2, newUnit: 5, minNewUnitConvert: 1},
  // Cups to Quart
  {conversionMult: 2, newUnit: 6, minNewUnitConvert: 0.5},
  // Cups to Gallon
  {conversionMult: 4, newUnit: 7, minNewUnitConvert: 0.25},
  // Gallon to Gallon
  {conversionMult: 16, newUnit: 7, minNewUnitConvert: -1},
  // Oz to Pound
  {conversionMult: 1, newUnit: 9, minNewUnitConvert: -1},
  // Pound to Pound
  {conversionMult: 1, newUnit: 9, minNewUnitConvert: -1},

]

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

  function formatIngredients(databaseIngredientString, inCartMult) {
    if(databaseIngredientString == null){
      return [];
    }
    returnIngridentList = [];
    var databaseIngredientsArray = databaseIngredientString.split('*')
    databaseIngredientsArray.forEach((element) => {
      if (element == '') {
        return
      }
      var ingredientInfo = element.split('~')
      returnIngridentList.push({amount: parseFloat(ingredientInfo[0]) * inCartMult, unit: parseInt(ingredientInfo[1]), name: ingredientInfo[2]})
    })
    return returnIngridentList
  }

  const UpgradeToProperUnit = (ingredient) => {
    while(ingredient.amount >= UnitConversion[ingredient.unit].minNewUnitConvert &&
      UnitConversion[ingredient.unit].minNewUnitConvert > 0){
      const newUnit = UnitConversion[ingredient.unit].newUnit
      const newAmount = ingredient.amount / UnitConversion[ingredient.unit].conversionMult
      ingredient = {name: ingredient.name, unit: newUnit, amount: newAmount}
      console.log(ingredient)
    }
    return ingredient
  }

  /* Returns the combination of ingredient. Must be passed ingredients of
  a single type (volume or weight). Ingredient1 must be in lesser or equal units to ingredient2 */
  const CombineIngredents = (ingredient1, ingredient2) => {
      let conversionIngreident = ingredient1;
      while(conversionIngreident.unit < ingredient2.unit){
        const newUnit = UnitConversion[conversionIngreident.unit].newUnit
        const newAmount = conversionIngreident.amount / UnitConversion[conversionIngreident.unit].conversionMult
        conversionIngreident = {name: ingredient1.name, unit: newUnit, amount: newAmount}
      }
      conversionIngreident.amount = conversionIngreident.amount + ingredient2.amount
      console.log('Before Conversion: ' + conversionIngreident)
      return UpgradeToProperUnit(conversionIngreident)
  }

  const CreateAndFillShoppingListTable = (ingredientsList) =>{
    shoppingdb.transaction(tx => {
      tx.executeSql(
        'DROP TABLE ShoppingList',
        [],
        []
      );
    });
    shoppingdb.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ShoppingList (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, checked INTEGER);',
        [],
        []
      );
    });
    ingredientsList.forEach((ingredient) => {
      addIngredientToTable(ingredient)
    })
  }

  const addIngredientToTable = (ingredient) => {
    // Round up to nearest quarter
    ingredient.amount = Math.ceil(4 * ingredient.amount) / 4
    return new Promise((resolve, reject) => {
      shoppingdb.transaction(tx => {
        tx.executeSql('INSERT INTO ShoppingList (text, checked) values (?, ?)', [IngredientToText(ingredient), false], 
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
        );
      },
      null,
      null
      );
    })
  };

  /* Function that handles the button press of 'send to shopping' */
  const handleSendToShopping = () => {
    let wholeArray = []
    let volumeArray = []
    let weightArray = []
    plannedRecipes.forEach((recipe) => {
      console.log(recipe.name)
      formatIngredients(recipe.ingredients, recipe.inCart).forEach((ingredient) => {
        console.log(ingredient.name)
        // Check if unit is whole
        if(ingredient.unit == 0){
          let foundStoredIngredent = wholeArray.find(storedIngredient => storedIngredient.name == ingredient.name)
          // Ingredent already exists in array
          if(foundStoredIngredent != null){
            foundStoredIngredent.amount = foundStoredIngredent.amount + ingredient.amount;
          }
          // No Existing Ingredient in array
          else{
            volumeArray.push(ingredient);
          }
        }
        // Check if unit is volume
        else if(ingredient.unit < 8){
          let foundStoredIngredent = volumeArray.find(storedIngredient => storedIngredient.name == ingredient.name)
          // Ingredent already exists in array
          if(foundStoredIngredent != null){
            if(foundStoredIngredent.unit < ingredient.unit){
              foundStoredIngredent = CombineIngredents(foundStoredIngredent, ingredient);
            }else{
              foundStoredIngredent = CombineIngredents(ingredient, foundStoredIngredent);
            }
          }
          // No Existing Ingredient in array
          else{
            volumeArray.push(UpgradeToProperUnit(ingredient));
          }
        }
        // Unit is weight
        else {
          let foundStoredIngredent = weightArray.find(storedIngredient => storedIngredient.name == ingredient.name)
          // Ingredent already exists in array
          if(foundStoredIngredent != null){
            if(foundStoredIngredent.unit < ingredient.unit){
              foundStoredIngredent = CombineIngredents(foundStoredIngredent, ingredient);
            }else{
              foundStoredIngredent = CombineIngredents(ingredient, foundStoredIngredent);
            }
          }
          // No Existing Ingredient in array
          else{
            weightArray.push(UpgradeToProperUnit(ingredient));
          }
        }
      })
    })
    console.log("Combined")
    const fullList = wholeArray.concat(volumeArray.concat(weightArray))
    CreateAndFillShoppingListTable(fullList);
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