/* ViewRecipe.js contains the ViewRecipe component used to view a singular recipe */

import React, { useState, useEffect } from 'react'
// import expo fonts function
import { useFonts } from 'expo-font';
// Import react-native components
import { StyleSheet, SafeAreaView, Button, Text, TextInput, View, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
// This import allows for the scroll bar to follow user input as they type
import InputScrollView from 'react-native-input-scroll-view'
// Import SQLite functions
import * as SQLite from 'expo-sqlite';
// This allows for the dropdown list for the Units in the ingridents
import { SelectList } from 'react-native-dropdown-select-list'
import { editStyles } from './editRecipeStyle';
//import image picker
import * as ImagePicker from 'expo-image-picker';

// Init SQLite database obj
const db = SQLite.openDatabase('recipe.db');

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
  instructions: 'Return to main menu. Do not pass Go. Do not collect $200.',
  // Recipie Image, null if no image
  image: null,
  // Recipe tags, null if no tags
  tags: [ "null" ]
}

function formatIngredients(recipe, databaseIngredientString) {
  var databaseIngredientsArray = databaseIngredientString.split('*')
  databaseIngredientsArray.forEach((element) => {
    if (element == '') {
      return
    }
    var ingredientInfo = element.split('~')
    recipe.ingredients.push({amount: parseFloat(ingredientInfo[0]), unit: parseInt(ingredientInfo[1]), name: ingredientInfo[2]})
  })
}

function formatTags(recipe, databaseTagsString) {
  var databaseTagsArray = databaseTagsString.split('@')
  databaseTagsArray.forEach((element) => {
    if(element == '') {
      return
    }
    recipe.tags.push({element})
  })
}

/* Sets the components of loaded recipe individually to account for the fact that not all components are in the
database currently */
function setLoadedRecipe(recipe){
  console.log("~setLoadedRecipe: loading recipe from db")
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
    formatIngredients(loadedRecipe, recipe.ingredients)
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
  if(recipe.image){
    loadedRecipe.image = recipe.image
  }else{
    loadedRecipe.image = null
  }
  console.log(recipe.tags)
  if(recipe.tags) {
    loadedRecipe.tags = []
    console.log("formatting tags")
    formatTags(loadedRecipe, recipe.tags)
  } else {
    console.log("no tags")
    loadedRecipe.tags = []
  }

}

/* This function passes loads a recipy by name direclty from the mock-up save. For actual implimentation, it'll need to pass the 
database id. It'll also need to parse it into proper formate here or on the otherside of the backend load function before passing
it to loadedRecipe */
export const LoadEmptyRecipe =  () => {
    loadedRecipe.name = "New Recipe"
    loadedRecipe.description = "Recipe Description"
    loadedRecipe.ingredients = []
    loadedRecipe.instructions = "Write Instructions Here"
    loadedRecipe.image = null
    loadedRecipe.tags = []
}

// View Recipe Screen takes navigation context and "route" which stores our recipe id and if the recipe is already pre loaded (recipeId, preLoaded)
export const ViewRecipe = ({ route, navigation}) => {
  // remove "view-recipe" header

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
  /* Extract the recipe id from the params object */
  loadedRecipe.id = route.params.recipeId

  /* isLoading state is true if we're currently loading our recipe */
  const [isLoading, setIsLoading] = useState(!route.params.preLoaded);

  
  /* Load our fonts */
  const [fontsLoaded] = useFonts({
    'Orienta': require('../assets/fonts/Orienta-Regular.ttf'),
  });
  
 
  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT, tags TEXT)',
        [],
        () => loadRecipe(loadedRecipe.id)
      );
    });
  }, [loadedRecipe.id]);
  /* SQLLite Function that loads the given recipeId
  Updates the Recipes state and setsIsLoading state to false when completed */
  const loadRecipe = (givenId) => {
    if (isLoading) {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Recipes WHERE id = ?', [givenId],
          (_, results) => {
            // Ensure we get exactly 1 result
            if (results.rows.length == 1) {
              // This assigns it to the global variable
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
  };
  /* If Loading, simply show that we're loading */
  if (isLoading || !fontsLoaded) {
    return (
        <View style={styles.loading}>
          <Text>Loading Recipe...</Text>
        </View>
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
            <Text key={index} style={{marginTop: 5, marginLeft: 15, marginRight: 15, padding: 0, textAlign: 'left', color: '#EDBD65', fontSize: 15, fontFamily: 'Orienta'}}>
              {element.amount} {element.name}
            </Text>
          );
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text key={index} style={{marginTop: 5, marginLeft: 15, marginRight: 15, padding: 0, textAlign: 'left', color: '#EDBD65', fontSize: 15, fontFamily: 'Orienta'}}>
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
            <Text key={index} style={{marginTop: 5, marginLeft: 15, marginRight: 15, padding: 0, textAlign: 'left', color: '#EDBD65', fontSize: 15, fontFamily: 'Orienta'}}>
              {element.amount} {Unit[element.unit].value} of {element.name}
            </Text>
          )
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text key={index} style={{marginTop: 5, marginLeft: 15, marginRight: 15, padding: 0, textAlign: 'left', color: '#EDBD65', fontSize: 15, fontFamily: 'Orienta'}}>
              {element.amount} {Unit[element.unit].value}s of {element.name}
            </Text>
          )
        }
      }
    });

    // List to contain JSX for tags list (initial render)
    const tagsList = []

    // Loop through all tags and add JSX to list
    loadedRecipe.tags.forEach((element, index) => {
      tagsList.push(
        <Text key={index} style={{marginTop: 5, marginLeft: 15, marginRight: 15, padding: 0, textAlign: 'left', color: '#EDBD65', fontSize: 15, fontFamily: 'Orienta'}}>
          {element}
        </Text>
      )
    })

    return (
    // The scroll view container allows the user to scroll through the components
    <View style={styles.wrapper}>
      
    <ScrollView>
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
      {/* Tags Section Title */}
      <Text style={styles.sectionHeaders}>
        Recipe Tags
      </Text>
      {/* Show Recipe Tags */}
      <View style={styles.flatlistContainer}>
        {tagsList}
      </View>
    </ScrollView>

    <View style={styles.buttomButtons}>
      {/* Edit Button */}
      <View style={styles.parent}>
      <TouchableOpacity
      onPress={() => navigation.replace('Edit-Recipe', {recipeId: loadedRecipe.id, nullLoad: false})}
      style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        </View>
      {/* Back Button */}
      <View style={styles.parent}>
      <TouchableOpacity
      onPress={() => navigation.replace('Multi-Screen')}
      style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>
    )
  }
}

// Edit Recipe Screen, route contains (recipeId, nullLoad)
export const EditRecipe = ({ route, navigation}) => {
   // remove "edit-recipe" header
  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  /* Extract the recipe id from the params object */
  loadedRecipe.id = route.params.recipeId

  // If loading from null (new recipe) load up new recipe setup
  if(route.params.nullLoad){
    LoadEmptyRecipe()
  }
  
  
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

  const [image, setImage] = useState(loadedRecipe.image)

  let tagsJSXList = []

  const [tagArray, setTagArray] = useState([...loadedRecipe.tags])

  const [tagsCount, setTagsCount] = useState(loadedRecipe.tags.length)
  
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
  };
 
  // This function handles updates everytime the user changes the text in the textbox
  const SaveEdit = () => {
      // Updates loaded recipe
      loadedRecipe.name = nameText
      loadedRecipe.description = descriptionText
      loadedRecipe.ingredients = ingredientArray
      loadedRecipe.instructions = instructionsText
      loadedRecipe.image = image
      loadedRecipe.tags = tagArray
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
  
  const AddTag = () => {
    let tempArray = tagArray
    tempArray.push("")
    setTagArray(tempArray)
    setTagsCount(tagsCount + 1)
  }

  const RemoveTag = (indexToRemove) => {
    let tempArray = tagArray
    tempArray = tempArray.filter((_, index) => index !== indexToRemove);
    // Update Tag Array
    setTagArray(tempArray)
    // Update Tag Count
    setTagsCount(tagsCount - 1)
  }

  /* Load our ingredient jsx before rendering */
  loadIngredientView()

  const ValidateNumericIngredientInput = (input, ingredientIndex) => {
    validInput = input.replace(/[^0-9.]/g, '')
    if(validInput != ''){
      ingredientArray[ingredientIndex].amount = parseFloat(validInput)
    }
  }

  const ValidateAlphebeticIngredientInput = (input, ingredientIndex) => {
    ingredientArray[ingredientIndex].name = input.replace(/[\~\*]/gi, '')
  }
  
  // Iterates through the ingredients and puts them in ingredientsList to display
  function loadIngredientView(){
    ingredientJSXList.length = 0
    ingredientArray.forEach((element, index) => {
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
            onChangeText={value => {ValidateNumericIngredientInput(value, index)}}
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
            onChangeText={value => (ValidateAlphebeticIngredientInput(value, index))}
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
      <TouchableOpacity  key={ingredientArray.length} style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5, borderRadius: 7}}
      onPress={() => AddIngredent()}>
        <Text>Add Ingredient</Text>
      </TouchableOpacity>
    );
  }

  function formatIngredients(ingredients) {
    let formattedIngredients = ''
    ingredients.forEach((element, index) => {
      formattedIngredients += element.amount.toString() + '~' + element.unit.toString() + '~' + element.name + '*'
    });
    return formattedIngredients
  }

  function formatTagsToString(tags) {
    let tagsString = ''
    tags.forEach((element) => {
      tagsString += element + '@'
    });
    console.log("saved %s to db", tagsString)
    return tagsString
  }

  function loadTagsView() {
    tagsJSXList.length = 0
    tagArray.forEach((element, index) => {
      tagsJSXList.push(
        <View  key={index} style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5, alignItems: 'center'}}>
            {/* Tag Input */}
            <TextInput
              style={{ flexGrow: 4, borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
              editable
              multiline={true}
              numberOfLines={1}
              blurOnSubmit={true}
              onChangeText={value => (tagArray[index] = value)}
              defaultValue={element.name}
            />
            {/* Delete Tag Button */}
            <View style={styles.deleteIngredient} >
              <TouchableOpacity onPress={() => RemoveTag(index)} >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
      )
    });
    tagsJSXList.push(
      <TouchableOpacity  key={tagArray.length} style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5, borderRadius: 7}}
      onPress={() => AddTag()}>
        <Text>Add New Tag</Text>
      </TouchableOpacity>
    );
  }
  // Rendering Tags 
  loadTagsView();

  /*SQLite Function that updates the Name in the database */
  function updateRecipe(recipe) {
    /* The ingredents are going to need to be parsed into text or something to go into the database, then 
    they're going to need to be unparsed in the load. */
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
    const ingredientsString = formatIngredients(recipe.ingredients)
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
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET image = ? WHERE id = ?;`, 
        [recipe.image, recipe.id]);
      },
      null,
      null,
    );
    const tagString = formatTagsToString(recipe.tags)
    db.transaction(
      tx => {
        tx.executeSql(`UPDATE Recipes SET tags = ? WHERE id = ?;`, 
        [tagString, recipe.id]);
      },
      null,
      null,
    );
    console.log("db updated, tags= %s", tagString)
    return
  };

  return (
    <>
    {/* This scroll view follows the location the user is typing. The keyboardOffset is set to prevent the keyboard on ios for hiding the curser */}
      <InputScrollView style={[editStyles.backgroundColor, {backgroundColor:'#983429'}]} keyboardOffset = {120}>
      <SafeAreaView > 
      {/* Enter name of recipe */}
      <TextInput style={[editStyles.sectionText,  {borderWidth:  1},
        {marginTop: 40},
        {marginBottom: 5}, 
        {marginLeft: 20}, 
        {marginRight: 20}, 
        {padding: 10}, 
        {textAlign: 'center'}]}
         editable
         multiline={true}
         numberOfLines={1}
         blurOnSubmit={true}
         onChangeText={value => setNameText(value)}
         defaultValue={nameText} />
        
       {/* Enter description */}
      <TextInput style={[editStyles.sectionText,  {borderWidth:  1}, 
        {marginTop: 0}, 
        {marginBottom: 10}, 
        {marginLeft: 20}, 
        {marginRight: 20}, 
        {padding: 10}, 
        {textAlign: 'center'}]}

        placeholder="Description"
        placeholderTextColor={'#EDBD65'}
        editable
        multiline
        scrollEnabled={false}
        onChangeText={value => setDescriptonText(value)}
        defaultValue={descriptionText} /> 

      {/* Image Picker */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => pickImage()} style={styles.uploadImage}>
          <Text style={styles.buttonText}>Upload an Image</Text>
          </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

      {/* Ingredents section title */}
      <Text 
        style={styles.sectionHeaders}>
        Ingredients
      </Text>
      {/* Show the ingredients*/}
      {ingredientJSXList}

      {/* Instructions section title */}
      <Text 
        style={styles.sectionHeaders}>
        Instructions
      </Text>
      {/* Instruction Text */}
      <TextInput
        style={{borderWidth:  1, marginTop: 5, marginBottom: 30, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left', borderRadius: 7}}
        editable
        multiline
        scrollEnabled={false}
        onChangeText={value => setInstructionText(value)}
        defaultValue={instructionsText}
      />
      <TextInput/>
      {/* Tags Section Title */}
      <Text 
        style = {styles.sectionHeaders}>
        Recipe Tags
      </Text>
      {/* Show Tags */}
      {tagsJSXList}

      <View style={styles.buttomButtons}>
      {/* Save Button */}
      <View style={styles.parent}>
      <TouchableOpacity onPress={() => SaveEdit()} style={[editStyles.button, {backgroundColor: '#983429'}]}>
        <Text style={editStyles.buttonText}> Save </Text>
      </TouchableOpacity>
      </View>
      {/* Cancel/Back Button */}
      <View style={styles.parent}>
      <TouchableOpacity  onPress={() => {console.log("Cancel: ", loadedRecipe.ingredients.length); navigation.replace('View-Recipe', {recipeId: loadedRecipe.id, preLoaded: true})}}
        style={[editStyles.button, {backgroundColor: '#983429'}]} >
        <Text style={editStyles.buttonText}> Cancel </Text>
      </TouchableOpacity>
      </View>
      </View>
      </SafeAreaView> 
      </InputScrollView>
      </>
  )
}

/* ViewRecipe specific stylesheet */
//TODO: roll some of this into the global stylesheet
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#983429'
  },
  recipeName: {
    paddingTop: 20,
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
  uploadImage:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#EDBD65',
    width: 140,
    height: 30,
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    fontFamily: 'Orienta',
    fontSize: 15,
    color: '#293137',
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

