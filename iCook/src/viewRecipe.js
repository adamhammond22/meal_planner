import { useState, useEffect } from 'react'

import { StyleSheet, SafeAreaView, Button, Text, TextInput, View, ScrollView, TouchableOpacity, FlatList, Alert, Pressable } from 'react-native'

// This import allows for the scroll bar to follow user input as they type
import InputScrollView from 'react-native-input-scroll-view'

// Import SQLite functions
import * as SQLite from 'expo-sqlite';

// This allows for the dropdown list for the Units in the ingridents
import { SelectList } from 'react-native-dropdown-select-list'

// Init SQLite database obj
const db = SQLite.openDatabase('recipe.db');

import * as Font from 'expo-font';


// An "enum" for units
const Unit = [
    {key: 0, value: 'Whole'},
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
  ingredients: [{name: 'null', unit: null, amount: null}, {name: 'null', unit: null, amount: null}],
  // This is the instruction text
  instructions: 'Return to main menu. Do not pass Go. Do not collect $200.'
}

function formatIngredients(recipe, databaseIngredientString) {
  console.log("~formatIngredients(): Passed recipe.ingredients: ", recipe.ingredients)
  var databaseIngredientsArray = databaseIngredientString.split('*')
  console.log("~formatIngredients(): List of Ingredients: ", databaseIngredientsArray)
  databaseIngredientsArray.forEach((element) => {
    if (element == '') {
      console.log(recipe.ingredients)
      return
    }
    var ingredientInfo = element.split('~')
    console.log("~formatIngredients(): Ingredient Info: ", ingredientInfo)
    recipe.ingredients.push({amount: ingredientInfo[0], unit: ingredientInfo[1], name: ingredientInfo[2]})
    console.log("~formatIngredients(): Added Recipe Ingredients: ", recipe.ingredients)
  })
}

/* Sets the components of loaded recipe individually to account for the fact that not all components are in the
database currently */
function setLoadedRecipe(recipe){
  loadedRecipe.name = recipe.name
  /* Check if recipe object has a description */
  if (recipe.description) {
    loadedRecipe.description = recipe.description
  } else {
    loadedRecipe.description = ''
  }
  /* Check if recipe object has ingredients */
  if (recipe.ingredients) {
    // TODO: Write SQL to ingredent Array Parser
    //loadedRecipe.ingredients = recipe.ingredients
    loadedRecipe.ingredients = []
    console.log("~setLoadedRecipe(): Unformatted ingredients from database:", recipe.ingredients)
    formatIngredients(loadedRecipe, recipe.ingredients)
    console.log("~setLoadedRecipe(): Formatted ingredients:", recipe.ingredients)
    // loadedRecipe.ingredients = recipe.ingredients
  } else {
    loadedRecipe.ingredients = []
  }
  /* Check if recipe object has instructions */
  if (recipe.instructions) {
    loadedRecipe.instructions = recipe.instructions
  } else {
    loadedRecipe.instructions = ''
  }

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
  console.log("~const ViewRecipe(): view recipe ingredients:", loadedRecipe.ingredients)
  console.log("~const ViewRecipe(): view recipe ingredients:", loadedRecipe.ingredients)
  console.log("~const ViewRecipe(): view recipe has currentRecipeId of:", loadedRecipe.id)

  /* isLoading is true if we're currently loading our recipe */
  const [isLoading, setIsLoading] = useState(!route.params.preLoaded);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Orienta': require('./fonts/Orienta-Regular.ttf')
      });
    };
  
    loadFont();
  }, []);
  
 
  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT)',
        [],
        () => loadRecipe(loadedRecipe.id)
      );
    });
  }, [loadedRecipe.id]);
  console.log("~~before loadRecipe()")
  /* SQLLite Function that loads the given recipeId
  Updates the Recipes state and setsIsLoading state to false when completed */
  const loadRecipe = (givenId) => {
    if (isLoading) {
      console.log("~~loadRecipe() isLoading")
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Recipes WHERE id = ?', [givenId],
          (_, results) => {
            // Ensure we get exactly 1 result
            if (results.rows.length == 1) {
              // This assigns it to the global variable
              console.log("~viewRecipe(): entering setLoadedRecipe:", results.rows.item(0))
              setLoadedRecipe(results.rows.item(0));
            } else {
              // If we do not, throw a message
              console.log("~viewRecipe(): loadRecipe() error:", givenId, "' has ", results.rows.length, " matches found!")
            }
            /* When the callback is completed, update our 2 states */
            setIsLoading(false);
          });
          (_, error) => console.log("viewRecipe.js: loadRecipe() error: ", error) // Error callback
      });
    }
    else {
      console.log("~~loadRecipe() !isLoading")
    }
  };
  console.log("~~after loadRecipe()")
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
    <View style={styles.wrapper}>
    <ScrollView>
    <View style={styles.buttomButtons}>
      {/* Edit Button */}
      <View style={styles.parent}>
      <Pressable
      onPress={() => navigation.replace('Edit-Recipe', {nullLoad: false})}
      style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        </View>
      {/* Back Button */}
      <View style={styles.parent}>
      <Pressable
      onPress={() => navigation.replace('Multi-Screen')}
      style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        </View>
        </View>
      {/* Name Text */}
      <Text style={styles.recipeName}>
        {loadedRecipe.name}
      </Text>
      <Text 
        style={styles.descriptionStyle}>
        {loadedRecipe.description}
      </Text> 
      {/* Ingredents section title */}
      <Text 
        style={styles.sectionHeaders}>
        Ingredients
      </Text>
      {/* Show the ingredients */}
      <View style={styles.flatlistContainer}>
      {ingredientList}
      </View>
      {/* Instructions section title */}
      <Text 
        style={styles.sectionHeaders}>
        Instructions
      </Text>
      {/* Instruction text */}
      <View style={styles.flatlistContainer}>
      <Text 
        style={styles.sectionText}>
        {loadedRecipe.instructions}
      </Text>
      </View>
    </ScrollView>
    </View>
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
    console.log("loaded empty recipe template")
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

  /* ingredientArray is a state of the ingredient objects in the component */
  const [ingredientArray, setIngredientArray] = useState([...loadedRecipe.ingredients])
  
  /* ingredientList is a list of JSX representing all our ingredients */
  let ingredientJSXList = []
  
  const [ingredientCount, setIngredientCount] = useState(loadedRecipe.ingredients.length)
 
  // This function handles updates everytime the user changes the text in the textbox
  const SaveEdit = () => {
    console.log("Save")
      // Updates loaded recipe
      loadedRecipe.name = nameText
      loadedRecipe.description = descriptionText
      loadedRecipe.ingredients = ingredientArray
      loadedRecipe.instructions = instructionsText
      // Saves to database
      updateRecipe( loadedRecipe )
      // Goes back to view page
      navigation.replace('View-Recipe', { recipeId: loadedRecipe.id, preLoaded: true})
  }

  /* Function to Add an ingredient */
  const AddIngredent = () => {
    let tempArray = ingredientArray
    tempArray.push({amount: 0, unit: 0, name: ""})
    // Update Ingredient Array
    setIngredientArray(tempArray)
    // Update Ingredient Count (forces an update durring the add)
    setIngredientCount(ingredientCount + 1)
  }
  
  /* Function to Remove an ingredient from the ingredientList, specified by given index */
  const RemoveIngredent = (indexToRemove) => {
    let tempArray = ingredientArray
    tempArray = tempArray.filter((_, index) => index !== indexToRemove);
    // Update Ingredient Array
    setIngredientArray(tempArray)
    // Update Ingredient Count (forces an update durring the add)
    setIngredientCount(ingredientCount - 1)
  }  
  
  /* Load our ingredient jsx before rendering */
  loadIngredientView()
  
  // Iterates through the ingredients and puts them in ingredientsList to display
  function loadIngredientView(){
    console.log("Original Ingredient Count: ", loadedRecipe.ingredients.length)
    ingredientJSXList.length = 0
    ingredientArray.forEach((element, index) => {
      console.log(element)
      ingredientJSXList.push(
        <View  key={index} style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5, alignItems: 'center'}}>
          {/* Amount Input */}
          <TextInput
            style={{ flexGrow: 1, borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 10, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
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
          style = {{ flexGrow: 1}}
          setSelected={(key) => (ingredientArray[index].unit = key)} 
          data={Unit} 
          save='key'
          defaultOption={Unit[element.unit]}
          />
          {/* Name Input */}
          <TextInput
            style={{ flexGrow: 4, borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
            editable
            multiline={true}
            numberOfLines={1}
            blurOnSubmit={true}
            onChangeText={value => (ingredientArray[index].name = value)}
            defaultValue={element.name}
          />
          {/* Delete Ingredient Button */}
          <View style={styles.deleteIngredient} >
            <TouchableOpacity onPress={() => RemoveIngredent(index)} >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    ingredientJSXList.push(
      <TouchableOpacity  key={ingredientArray.length} style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5}}
      onPress={() => AddIngredent()}>
        <Text>Add Ingredient</Text>
      </TouchableOpacity>
    );
  }

  function formatIngredients(ingredients) {
    let formattedIngredients = ''
    console.log("Formatting for database:", ingredients)
    ingredients.forEach((element, index) => {
      formattedIngredients += element.amount.toString() + '~' + element.unit + '~' + element.name + '*'
    });
    console.log("Formatted Ingredients:", formattedIngredients)
    return formattedIngredients
  }

  /*SQLite Function that updates the Name in the database */
  function updateRecipe(recipe) {
    console.log("update rec recipe is:", recipe)
    /* The ingredents are going to need to be parsed into text or something to go into the database, then 
    they're going to need to be unparsed in the load. */
    // TODO: Write SQL to ingredent Array Parser
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET name = ? WHERE id = ?;`, 
        [recipe.name, recipe.id]);
      },
      null,
      null,
    );
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET description = ? WHERE id = ?;`, 
        [recipe.description, recipe.id]);
      },
      null,
      null,
    );
    console.log("trying to add ingredients:", recipe.ingredients)
    const ingredientsString = formatIngredients(recipe.ingredients)
    console.log("ingredients string:", ingredientsString)
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET ingredients = ? WHERE id = ?;`, 
        [ingredientsString, recipe.id]);
      },
      null,
      null,
    );
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET instructions = ? WHERE id = ?;`, 
        [recipe.instructions, recipe.id]);
      },
      null,
      null,
    );
    return
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
      {ingredientJSXList}
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
        onPress={() => {console.log("Cancel: ", loadedRecipe.ingredients.length); navigation.replace('View-Recipe', {recipeId: loadedRecipe.id, preLoaded: true})}}
      />
      </InputScrollView>
    </>
  )
  
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#983429'
  },
  recipeName: {
    fontFamily: 'Orienta',
    fontSize: 32,
    color: '#EDBD65',
    textAlign: 'center'
  },
  descriptionStyle: {
    fontFamily: 'Orienta',
    fontSize: 15,
    color: '#EDBD65',
    textAlign: 'center'
  },
  sectionText: {
    fontFamily: 'Orienta',
    fontSize: 15,
    color: '#EDBD65',
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 5,
    paddingRight: 15 
  },
  sectionHeaders: {
    fontFamily: 'Orienta',
    fontSize: 20,
    color: '#EDBD65',
    textAlign: 'left',
    paddingLeft: 30,
    paddingTop: 20 
  },
  flatlistContainer: {
    backgroundColor: '#293137',
    marginVertical: 15,
    marginHorizontal: 30,
    paddingTop: 5,
    paddingBottom: 11,
    justifyContent: 'center',
    borderRadius: 7
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 7,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#EDBD65',
  },
  buttonText: {
    fontFamily: 'Orienta',
    fontSize: 15,
    color: '#E293137',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  parent: {
    width: 60,
    height: 30,
    backgroundColor: '#EDBD65',
    margin: 20,
    borderRadius: 3
  },
  buttomButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

