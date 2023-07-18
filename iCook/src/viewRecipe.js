/* ViewRecipe.js contains the ViewRecipe component used to view a singular recipe */

import React, { useState, useEffect } from 'react'
// Import react-native components
import { SafeAreaView, Button, Text, TextInput, View, ScrollView, TouchableOpacity, Image, Platform, Alert } from 'react-native'
// This import allows for the scroll bar to follow user input as they type
import InputScrollView from 'react-native-input-scroll-view'
// Import SQLite functions
import * as SQLite from 'expo-sqlite';
// This allows for the dropdown list for the Units in the ingridents
import { SelectList } from 'react-native-dropdown-select-list'
// import image picker
import * as ImagePicker from 'expo-image-picker';
// Import for various style sheets
import { editStyles } from './styleSheets/editRecipeStyle'
import { viewStyles } from './styleSheets/viewRecipeStyle'
import { globalStyles, loadFonts } from './styleSheets/globalStyle';

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
    recipe.tags.push(element)
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
  if(recipe.tags) {
    loadedRecipe.tags = []
    formatTags(loadedRecipe, recipe.tags)
  } else {
    loadedRecipe.tags = []
  }

}

/* This function passes loads a recipy by name direclty from the mock-up save. For actual implimentation, it'll need to pass the 
database id. It'll also need to parse it into proper formate here or on the otherside of the backend load function before passing
it to loadedRecipe */
export const LoadEmptyRecipe =  () => {
    loadedRecipe.name = ""
    loadedRecipe.description = ""
    loadedRecipe.ingredients = []
    loadedRecipe.instructions = ""
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
  loadFonts
 
  /* useEffect calls this every time this application is loaded, we make sure a table exists and call loadRecipes() */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT, image BLOB, tags TEXT)',
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
  if (isLoading){//} || !fontsLoaded) {
    return (
      <>
        <View style={editStyles.loading}>
          <Text>Loading Recipe...</Text>
        </View>
      </>
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
            <Text key={index} style={viewStyles.recipeIngredientStyle}>
              {element.amount} {element.name}
            </Text>
          );
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text key={index} style={viewStyles.recipeIngredientStyle}>
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
            <Text key={index} style={viewStyles.recipeIngredientStyle}>
              {element.amount} {Unit[element.unit].value} of {element.name}
            </Text>
          )
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text key={index} style={viewStyles.recipeIngredientStyle}>
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
        <Text key={index} style={viewStyles.recipeTagStyle}>
          { element }
        </Text>
      )
  })

  return (
    // The scroll view container allows the user to scroll through the components
    <View style = {globalStyles.wrapper}>
      <ScrollView>
        {/* Name Text */}
        <Text style={viewStyles.recipeNameStyle}>
          {loadedRecipe.name}
        </Text>
        <Text 
          style={viewStyles.recipeDescriptionStyle}>
          {loadedRecipe.description}
        </Text> 
        {/* View Image */}
        <View style={globalStyles.imageContainerStyle}>
        {loadedRecipe.image && <Image source={{ uri: loadedRecipe.image }} style={globalStyles.imageStyle} />}
        </View>
        {/* Ingredents section title */}
        <Text 
          style={viewStyles.sectionHeaderStyle}>
          Ingredients
        </Text>
        {/* Show the ingredients */}
        <View style={viewStyles.flatlistContainerStyle}>
        {ingredientList}
        </View>
        {/* Instructions section title */}
        <Text 
          style={viewStyles.sectionHeaderStyle}>
          Instructions
        </Text>
        {/* Instruction text */}
        <View style={viewStyles.flatlistContainerStyle}>
        <Text 
          style={viewStyles.sectionTextStyle}>
          {loadedRecipe.instructions}
        </Text>
        </View>
        {/* Tags Section Title */}
        <Text style={viewStyles.sectionHeaderStyle}>
          Recipe Tags
        </Text>
        {/* Show Recipe Tags */}
        <View style={viewStyles.flatlistContainerStyle}>
          {tagsList}
        </View>
      </ScrollView>
      <View style={globalStyles.bottomButtonStyle}>
        {/* Edit Button */}
        <View style={globalStyles.parentStyle}>
          <TouchableOpacity style={globalStyles.buttonStyle}
          onPress={() => navigation.replace('Edit-Recipe', {recipeId: loadedRecipe.id, nullLoad: false})}>
            <Text style={globalStyles.buttonTextStyle}>Edit</Text>
          </TouchableOpacity>
        </View>
        {/* Back Button */}
        <View style={globalStyles.parentStyle}>
          <TouchableOpacity style={globalStyles.buttonStyle}
          onPress={() => navigation.replace('Multi-Screen')}>
            <Text style={globalStyles.buttonTextStyle}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
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

  // This function deletes the passed recipe and returns to the main screen
  const deleteRecipeFromEditPage = (recipeId) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM Recipes where id = ?;`, [recipeId]);
      },
      null,
      null
    );
    navigation.replace('Multi-Screen')
  };

  const deleteAlert = (recipeId) => {
    Alert.alert('Delete Recipe?', 'Are you sure you want to delete this recipe?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => deleteRecipeFromEditPage(recipeId),
        style: 'ok'
      },
    ]);
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
  loadIngredientEdit()

  const ValidateNumericIngredientInput = (input, ingredientIndex) => {
    validInput = input.replace(/[^0-9.]/g, '')
    if(validInput != ''){
      ingredientArray[ingredientIndex].amount = parseFloat(validInput)
    }
  }

  const ValidateAlphebeticIngredientInput = (input, ingredientIndex) => {
    ingredientArray[ingredientIndex].name = input.replace(/[\~\*]/g, '')
  }
  
  // Iterates through the ingredients and puts them in ingredientsList to display
  function loadIngredientEdit(){
    ingredientJSXList.length = 0
    ingredientArray.forEach((element, index) => {
      ingredientJSXList.push(
        <View  key={index} style = {editStyles.ingredientPanelStyle}>
          {/* Amount Input */}
          <TextInput
            style={editStyles.ingredientInputAmountStyle}
            editable
            keyboardType='numeric'
            multiline={true}
            blurOnSubmit={true}
            onChangeText={value => {ValidateNumericIngredientInput(value, index)}}
            defaultValue={element.amount.toString()}
            placeholder = '###'
            // Limited to 6 characters to keep edit display looking neat
            maxLength={6}
          />
          {/* Unit Select */}
          <View style={editStyles.ingredientInputUnitContainerStyle}>
            <SelectList 
              style = {editStyles.ingredientInputUnitStyle}
              setSelected={(key) => (ingredientArray[index].unit = key)} 
              data={Unit} 
              save='key'
              defaultOption={Unit[element.unit]}
            />
          </View>
          {/* Name Input */}
          <TextInput
            style={editStyles.ingredientInputNameStyle}
            editable
            multiline={true}
            //numberOfLines={1}
            blurOnSubmit={true}
            onChangeText={value => (ValidateAlphebeticIngredientInput(value, index))}
            defaultValue={element.name}
            placeholder='Ingrident Name'
          />
          {/* Delete Ingredient Button */}
          <TouchableOpacity style = {editStyles.ingredientDeleteButtonStyle}
            onPress={() => RemoveIngredent(index)} >
              <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    });
    ingredientJSXList.push(
      <TouchableOpacity  key={ingredientArray.length} style = {editStyles.ingredientAddButtonStyle}
      onPress={() => AddIngredent()}>
        <Text style={editStyles.ingredientAddButtonTextStyle}>Add Ingredient</Text>
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
    return tagsString
  }

  const ValidateTagInput = (input, tagIndex) => {
    tagArray[tagIndex] = input.replace(/[\@]/g, '')
  }

  function loadTagsView() {
    tagsJSXList.length = 0
    tagArray.forEach((element, index) => {
      tagsJSXList.push(
        <View  key={index} style = {editStyles.tagPanelStyle}>
            {/* Tag Input */}
            <TextInput
              style={editStyles.tagInputNameStyle}
              editable
              multiline={true}
              numberOfLines={1}
              blurOnSubmit={true}
              onChangeText={value => ValidateTagInput(value, index)}
              defaultValue={element}
              placeholder='Tag Name'
            />
            {/* Delete Tag Button */}
            <TouchableOpacity style = {editStyles.tagDeleteButtonStyle}
            onPress={() => RemoveTag(index)} >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
      )
    });
    tagsJSXList.push(
      <TouchableOpacity  key={tagArray.length} style = {editStyles.tagAddButtonStyle}
      onPress={() => AddTag()}>
        <Text style = {editStyles.tagAddButtonTextStyle}>Add New Tag</Text>
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
    return
  };

  return (
    <>
    {/* This scroll view follows the location the user is typing. The keyboardOffset is set to prevent the keyboard on ios for hiding the curser */}
    <SafeAreaView>
    <InputScrollView style={globalStyles.wrapper} keyboardOffset = {120}>
      
      {/* Enter name of recipe */}
      <TextInput style={editStyles.nameInputStyle}
         editable
         multiline={true}
         numberOfLines={1}
         blurOnSubmit={true}
         onChangeText={value => setNameText(value)}
         defaultValue={nameText} 
         placeholder = 'Recipe Name'
         />
        
       {/* Enter description */}
      <TextInput style={editStyles.descriptionInputStyle}

        placeholder="Description"
        editable
        multiline
        scrollEnabled={false}
        onChangeText={value => setDescriptonText(value)}
        defaultValue={descriptionText}/> 

      {/* Image Picker */}
      <View style = {globalStyles.imageContainerStyle}>
        <TouchableOpacity onPress={() => pickImage()} style={editStyles.uploadImageButtonStyle}>
          <Text style = {globalStyles.buttonTextStyle}>Upload an Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={globalStyles.imageStyle} />}
      </View>
      {/* Ingredents section title */}
      <Text 
        style={editStyles.sectionHeaderStyle}>
        Ingredients
      </Text>
      {/* Show the ingredients*/}
      {ingredientJSXList}

      {/* Instructions section title */}
      <Text 
        style={editStyles.sectionHeaderStyle}>
        Instructions
      </Text>
      {/* Instruction Text */}
      <TextInput
        style = {editStyles.instructionInputStyle}
        editable
        multiline
        scrollEnabled={false}
        onChangeText={value => setInstructionText(value)}
        defaultValue={instructionsText}
        placeholder = 'Recipe Instructions'
      />
      {/* Tags Section Title */}
      <Text style = {editStyles.sectionHeaderStyle}>
        Recipe Tags
      </Text>
      {/* Show Tags */}
      {tagsJSXList}
      {/* Delete Button */}
      <View style={globalStyles.bottomButtonStyle}>
        <View style={editStyles.parentDeleteStyle}>
          <TouchableOpacity style={[editStyles.buttonDeleteStyle]}
          onPress = {() => deleteAlert(loadedRecipe.id)}>
            <Text style={globalStyles.buttonTextStyle}>DELETE RECIPE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalStyles.bottomButtonStyle}>
        {/* Save Button */}
        <View style={globalStyles.parentStyle}>
          <TouchableOpacity style={globalStyles.buttonStyle} 
          onPress={() => SaveEdit()}>
            <Text style={globalStyles.buttonTextStyle}> Save </Text>
          </TouchableOpacity>
        </View>
        {/* Cancel/Back Button */}
        <View style={globalStyles.parentStyle}>
          <TouchableOpacity style={globalStyles.buttonStyle} 
          onPress={() => {navigation.replace('View-Recipe', {recipeId: loadedRecipe.id, preLoaded: true})}}>
            <Text style={globalStyles.buttonTextStyle}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </View>
    </InputScrollView>
    </SafeAreaView> 
    </>
  )
}
