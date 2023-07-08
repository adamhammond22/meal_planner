import { useState, useEffect } from 'react'

import { StyleSheet, SafeAreaView, Button, Text, TextInput, View, ScrollView, FlatList, Alert } from 'react-native'

// This import allows for the scroll bar to follow user input as they type
import InputScrollView from 'react-native-input-scroll-view'

// Import SQLite functions
import * as SQLite from 'expo-sqlite';

// This allows for the dropdown list for the Units in the ingridents
import { SelectList } from 'react-native-dropdown-select-list'

// Init SQLite database obj
const db = SQLite.openDatabase('recipe.db');

// An "enum" for units
const Unit = [
    {key: 0, value: ' '},
    {key: 1, value: 'Teaspoon'},
    {key: 2, value: 'Tablespoon'},
    {key: 3, value: 'fl oz'},
    {key: 4, value: 'Cup'},
    {key: 5, value: 'Pint'},
    {key: 6, value: 'Quart'},
    {key: 7, value: 'Gallon'},
    {key: 8, value: 'oz'},
    {key: 9, value: 'lb'}
]

/* This variable stores the data for the currently selected recipe to ensure only one load between the view and edit pages */
let loadedRecipe = {
  // The name variable has, obviously, the name of the recipe
  name: 'Unloaded Error',
  // This holds the description text
  description: 'You\'ve got yourself an unloaded error.',
  // This is an array for the ingredents. Each ingredent has the properties {name, unit, amount}
  ingredients: [{name: 'One', unit: 7, amount: 1}, {name: 'Two', unit: 9, amount: 2}],
  // This is the instruction text
  instructions: 'Return to main menu. Do not pass Go. Do not collect $200.'
}

/* Sets the components of loaded recipe individually to account for the fact that not all components are in the
database currently */
function setLoadedRecipe(recipe){
  loadedRecipe.name = recipe.name
  loadedRecipe.description = ''
  loadedRecipe.ingredients = recipe.ingredients
  loadedRecipe.instructions = recipe.instructions
}

/* This function passes loads a recipy by name direclty from the mock-up save. For actual implimentation, it'll need to pass the 
database id. It'll also need to parse it into proper formate here or on the otherside of the backend load function before passing
it to loadedRecipe */
export const LoadEmptyRecipe =  () => {
    loadedRecipe.name = "New Recipe"
    loadedRecipe.description = "Recipe Description"
    loadedRecipe.ingredients = [{amount: 1, unit: 0, name: 'example 1'}, {amount: 2, unit: 5, name: 'example 2'}]
    loadedRecipe.instructions = "Write Instructions Here"
}

// View Recipe Screen takes navigation context and "route" which stores our recipe id and if the recipe is already pre loaded (recipeId, preLoaded)
export const ViewRecipe = ({ route, navigation}) => {
  /* Extract the recipe id from the params object */
  loadedRecipe.id = route.params.recipeId
  console.log("view recipe has currentRecipeId of:", loadedRecipe.id)

  /* isLoading is true if we're currently loading our recipe */
  const [isLoading, setIsLoading] = useState(!route.params.preLoaded);

  /* Recipes is the state containing the list of currently loaded recipes, we may need ot limit the size of recipes (in the case the user has like 500 recipes) */
  const [recipe, setRecipe] = useState();
 
  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
        [],
        () => loadRecipe(loadedRecipe.id)
      );
    });
  }, [loadedRecipe.id]);

  /* SQLLite Function that loads the given recipeId
  Updates the Recipes state and setsIsLoading state to false when completed */
  const loadRecipe = (givenId) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Recipes WHERE id = ?', [givenId],
        (_, results) => {
          // Ensure we get exactly 1 result
          if (results.rows.length == 1) {
            const recipe = results.rows.item(0);
            console.log("Loaded recipe: ", recipe);
          } else {
            // If we do not, throw a message
            console.log("viewRecipe.js: loadRecipe() error:", givenId, "' has ", results.rows.length, " matches found!")
          }
          /* When the callback is completed, update our 2 states */
          setRecipe(recipe);
          setIsLoading(false);
          // This assigns it to the global variable
          setLoadedRecipe(recipe);

        });
        (_, error) => console.log("viewRecipe.js: loadRecipe() error: ", error) // Error callback
    });
  };

  /* If Loading, simply show that we're loading */
  if (isLoading) {
    return (
      <SafeAreaView>
        <View style={styles.loading}>
          <Text>Loading Recipe...</Text>
        </View>
      </SafeAreaView>
    );
  } else {
  /* Otherwise, display our Recipe */

    // All the ingredent renders are loaded into here and called in the return statment
    const ingredientList = []
    // This loop compiles all the ingredents into ingredients list to be direclty shown with .push
    loadedRecipe.ingredients.forEach((element, index) => {
      // If no unit selected
      if (element.unit == 0){
        // If should be singular
        if(element.amount > 0 && element.amount <= 1){
          ingredientList.push(
            <Text key={index} style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
              {element.amount} {element.name}
            </Text>
          );
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text key={index} style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
              {element.amount} {element.name}s
            </Text>
          )
        }
      } 
      // If unit selected
      else {
        // If should be singular
        if(element.amount > 0 && element.amount <= 1){
          ingredientList.push(
            <Text key={index} style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
              {element.amount} {Unit[element.unit].value} of {element.name}
            </Text>
          )
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text key={index} style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
              {element.amount} {Unit[element.unit].value}s of {element.name}
            </Text>
          )
        }
      }
    });
    return (
    // The scroll view container allows the user to scroll through the components
    <ScrollView>
      {/* Name Text */}
      <Text 
        style={{ fontSize: 20, marginTop: 20, marginBottom: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'center', fontWeight: 'bold'}}>
        {loadedRecipe.name}
      </Text> 
      <Text 
        style={{marginTop: 5, marginBottom: 10, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'center'}}>
        {loadedRecipe.description}
      </Text> 
      {/* Ingredents section title */}
      <Text 
        style={{fontSize: 16, marginTop: 5, marginBottom: 0, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left', fontWeight: 'bold'}}>
        Ingredients
      </Text>
      {/* Show the ingredients */}
      {ingredientList}
      {/* Instructions section title */}
      <Text 
        style={{fontSize: 16, marginTop: 15, marginBottom: 0, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left', fontWeight: 'bold'}}>
        Instructions
      </Text>
      {/* Instruction text */}
      <Text 
        style={{marginTop: 5, marginBottom: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
        {loadedRecipe.instructions}
      </Text>

      {/* Edit Button */}
      <Button
        title = {'Edit'}
        onPress={() => navigation.replace('Edit-Recipe', {nullLoad: false})}
      />
      {/* Back Button */}
      <Button
        title = {'Back'}
        onPress={() => navigation.replace('Multi-Screen')}
      />
    </ScrollView>
    )
  }
}

// Edit Recipe Screen, route contains (recipeId, nullLoad)
export const EditRecipe = ({ route, navigation}) => {
  /* Extract the recipe id from the params object */
  loadedRecipe.id = route.params.recipeId

  // If loading from null (new recipe) load up new recipe setup
  if(route.params.nullLoad){
    LoadEmptyRecipe()
  }
  
  console.log("Edit recipe called: route params:", route.params, " currentRecipeId: ", loadedRecipe.id)
  
  // These variables keep track of the various chanded components. They will be tossed if cancel is hit, or applied to
  // loadedRecipe and saved to the database if save is hit

  // This state keeps track of the name text
  const [nameText, setNameText] = useState(loadedRecipe.name)
  // This state keeps track of the instruction text
  const [instructionsText, setInstructionText] = useState(loadedRecipe.instructions)
  // This state keeps track of the short description text
  const [descriptionText, setDescriptonText] = useState(loadedRecipe.description)
  // This variable stores the changes in the ingredients
  let ingredientArray = []

  // This function handles updates everytime the user changes the text in the textbox
  const SaveEdit = () => {
      // Updates loaded recipe
      loadedRecipe.name = nameText
      loadedRecipe.description = descriptionText
      loadedRecipe.ingredients = ingredientArray
      loadedRecipe.instructions = instructionsText
      // Saves to database
      updateName( loadedRecipe.id, nameText)
      // Goes back to view page
      navigation.replace('View-Recipe', { recipeId: loadedRecipe.id, preLoaded: true})
  }

  // Iterates through the ingredients and puts them in ingredientsList to display
  const ingredientList = []
  console.log(loadedRecipe.ingredients)
  loadedRecipe.ingredients.forEach((element, index) => {
    ingredientArray.push(element)
    console.log(element)
    ingredientList.push(
      <View  key={index} style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5}}>
      {/* Amount Input */}
      <TextInput
        style={{borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 10, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
        editable
        keyboardType='numeric'
        multiline={true}
        numberOfLines={1}
        blurOnSubmit={true}
        onChangeText={value => (ingredientArray[index].amount = parseFloat(value))}
        defaultValue={element.amount.toString()}
      />
      {/* Unit Select */}
      <SelectList 
      style = {{marginTop: 20, marginBottom: 5}}
      setSelected={(key) => (ingredientArray[index].unit = key)} 
      data={Unit} 
      save='key'
      defaultOption={Unit[element.unit]}
      />
      {/* Name Input */}
      <TextInput
        style={{borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
        editable
        multiline={true}
        numberOfLines={1}
        blurOnSubmit={true}
        onChangeText={value => (ingredientArray[index].name = value)}
        defaultValue={element.name}
      />
      </View>
    );
  });

  /*SQLite Function that updates the Name in the database */
  // TODO: Update this to use instructionsText once that is a part of the db
  const updateName = (id, val) => {
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Names set name = ? where id = ?;`, [val, id]);
      },
      null,
      null,
    );
  };

  return (
    <>
    {/* This scroll view follows the location the user is typing. The keyboardOffset is set to prevent the keyboard on ios for hiding the curser */}
      <InputScrollView
      keyboardOffset = {120}>
      <View>
      {/* Title Text */}
      <TextInput
        style={{borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
        editable
        multiline={true}
        numberOfLines={1}
        blurOnSubmit={true}
        onChangeText={value => setNameText(value)}
        defaultValue={nameText}
      />
      <TextInput
        style={{borderWidth:  1, marginTop: 0, marginBottom: 10, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center'}}
        editable
        multiline
        scrollEnabled={false}
        onChangeText={value => setDescriptonText(value)}
        defaultValue={descriptionText}
      />
      {/* Ingredents section title */}
      <Text 
        style={{fontSize: 16, marginTop: 5, marginBottom: 0, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left', fontWeight: 'bold'}}>
        Ingredients
      </Text>
      {/* Show the ingredients*/}
      {ingredientList}
      {/* Instructions section title */}
      <Text 
        style={{fontSize: 16, marginTop: 15, marginBottom: 0, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left', fontWeight: 'bold'}}>
        Instructions
      </Text>
      {/* Instruction Text */}
      <TextInput
        style={{borderWidth:  1, marginTop: 5, marginBottom: 30, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left'}}
        editable
        multiline
        scrollEnabled={false}
        onChangeText={value => setInstructionText(value)}
        defaultValue={instructionsText}
      />
      </View>
      {/* Save Button */}
      <Button
        title = {'Save'}
        onPress={() => SaveEdit()}
      />
      {/* Cancel/Back Button */}
      <Button
        title = {'Cancel'}
        onPress={() => navigation.replace('View-Recipe', {recipeId: loadedRecipe.id, preLoaded: true})}
      />
      </InputScrollView>
    </>
  )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center'
    },
    wrapper: {
      flex: 1
    }
})
