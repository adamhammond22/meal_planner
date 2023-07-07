import { useState } from 'react'

import { StyleSheet, Button, Text, TextInput, View, ScrollView} from 'react-native'

// This import allows for the scroll bar to follow user input as they type
import InputScrollView from 'react-native-input-scroll-view'

// Imported calls for the mock-up database in tempFakeSave.js
import {Load, Save} from './tempFakeSave'

// An "enum" for units
const Unit = Object.freeze({
    None: ' ',
    Teaspoon: 'teaspoon',
    TableSpoon: 'tablespoon',
    FLOunce: 'fl oz',
    Cup: 'cup',
    Pint: 'pint',
    Quart: 'quart',
    Gallon: 'gallon',
    Ounce: 'oz',
    Pound: 'lb'
})

/* This variable stores the data for the currently selected recipe to ensure only one load between the view and edit pages */
let loadedRecipe = {
    // The name variable has, obviously, the name of the recipe
    name: 'Unloaded Error',
    // This is an array for the ingredents. Each ingredent has the properties {name, unit, amount}
    ingredients: [{name: 'One', unit: Unit.Gallon, amount: 1}, {name: 'Two', unit: Unit.Pound, amount: 2}],
    // This is the instruction text
    instructions: 'Return to main menu. Do not pass Go. Do not collect $200.'
}

/* Because the mock-up uses the name prop to identify which variable to save and load from, the original name had to be saved
to write back to that same variable. In the actual implimentation, a sub variable for the database id should be added directly 
to the varable loadedRecipe. The only reasion this one currently isn't is because this mock-up loads the "saved" recipe directly
instead of parcing it in the LoadRecipe function. */
let originalLoadedName = ' '
  
 
/* This function passes loadedRecipe direclty to the mock-up save. For actual implimentation, it'll need to parse into the database 
format here or in the backend function. */
const SaveRecipe = () => {
    Save(originalLoadedName, loadedRecipe);
}

/* This function passes loads a recipy by name direclty from the mock-up save. For actual implimentation, it'll need to pass the 
database id. It'll also need to parse it into proper formate here or on the otherside of the backend load function before passing
it to loadedRecipe */
export const LoadRecipe = ( name ) => {
    loadedRecipe = Load( name )
    originalLoadedName = loadedRecipe.name
}

// View Recipe Screen
export const ViewRecipe = ({ navigation }) => {
    const ingredientList = []
    // This loop compiles all the ingredents into ingredients list to be direclty shown with .push
    loadedRecipe.ingredients.forEach((element, index) => {
      // If no unit selected
      if (element.unit == ' '){
        // If should be singular
        if(element.amount > 0 && element.amount <= 1){
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
              {element.amount} {element.name}
            </Text>
          );
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
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
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
              {element.amount} {element.unit} of {element.name}
            </Text>
          )
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
              {element.amount} {element.unit}s of {element.name}
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
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left', fontWeight: 'bold'}}>
        {loadedRecipe.name}
      </Text> 
      
      {/* Ingredents section title */}
      <Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left', fontWeight: 'bold'}}>
        Ingredients
      </Text>
      {/* Show the ingredients */}
      {ingredientList}
  
      {/* Instructions section title */}
      <Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}>
        Instructions
      </Text>
      {/* Instruction text */}
      <Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left'}}>
        {loadedRecipe.instructions}
      </Text>

      {/* Edit Button */}
      <Button
        title = {'Edit'}
        onPress={() => navigation.replace('Edit-Recipe')}
      />
      {/* Back Button */}
      <Button
        title = {'Back'}
        onPress={() => navigation.replace('Main-List')}
      />
    </ScrollView>
    )
}

// Edit Recipe Screen
export const EditRecipe = ({ navigation }) => {
    // This state keeps track of the name text
    const [nameText, setNameText] = useState(loadedRecipe.name)
    // This state keeps track of the instruction text
    const [instructionsText, setInstructionText] = useState(loadedRecipe.instructions)
    // This function handles updates everytime the user changes the text in the textbox
    const SaveEdit = () => {
        loadedRecipe.name = nameText
        loadedRecipe.instructions = instructionsText
        SaveRecipe( originalLoadedName, loadedRecipe )
        navigation.replace('View-Recipe')
    }
    return (
      <>
      {/* This scroll view follows the location the user is typing. The keyboardOffset is set to prevent the keyboard on ios for hiding the curser */}
        <InputScrollView
        keyboardOffset = {120}>
        <View>
        {/* Title Text */}
        <TextInput
          style={{borderWidth:  1, marginTop: 30 , marginBottom: 30, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
          editable
          multiline={true}
          numberOfLines={1}
          blurOnSubmit={true}
          onChangeText={value => setNameText(value)}
          defaultValue={nameText}
        />
        {/* Instruction Text */}
        <TextInput
          style={{borderWidth:  1, marginTop: 30, marginBottom: 30, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left'}}
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
          onPress={() => navigation.replace('View-Recipe')}
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
