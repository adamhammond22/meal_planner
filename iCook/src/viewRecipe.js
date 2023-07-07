import { useState } from 'react'

import { StyleSheet, Button, Text, TextInput, View, ScrollView} from 'react-native'

// This import allows for the scroll bar to follow user input as they type
import InputScrollView from 'react-native-input-scroll-view'

// Imported calls for the mock-up database in tempFakeSave.js
import {Load, Save} from './tempFakeSave'

// This allows for the dropdown list for the Units in the ingridents
import { SelectList } from 'react-native-dropdown-select-list'

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
            <Text style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
              {element.amount} {element.name}
            </Text>
          );
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
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
            <Text style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
              {element.amount} {Unit[element.unit].value} of {element.name}
            </Text>
          )
        }
        // If should be plural
        else{
          ingredientList.push(
            <Text style={{marginTop: 5, marginLeft: 30, marginRight: 30, padding: 0, textAlign: 'left'}}>
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
    // This state keeps track of the short description text
    const [descriptionText, setDescriptonText] = useState(loadedRecipe.description)

    let ingredientArray = []
    // This function handles updates everytime the user changes the text in the textbox
    const SaveEdit = () => {
        loadedRecipe.name = nameText
        loadedRecipe.description = descriptionText
        loadedRecipe.ingredients = ingredientArray
        loadedRecipe.instructions = instructionsText
        SaveRecipe( originalLoadedName, loadedRecipe )
        navigation.replace('View-Recipe')
    }

    function changeIngredientAmount(editIndex, newAmount) {
      const change = ingredientArray.map((ingredient, index) => {
        if(editIndex == index){
          return {amount: newAmount, unit: ingredient.unit, name: ingredient.name}
        } else {
          return ingredient
        }
      });
    }

    const ingredientList = []
    loadedRecipe.ingredients.forEach((element, index) => {
      ingredientArray.push(element)
      ingredientList.push(
        <View style = {{flexDirection: 'row', flex: 4, borderWidth:  1, marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 5}}>
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
        <SelectList 
        style = {{marginTop: 20, marginBottom: 5}}
        setSelected={(key) => (ingredientArray[index].unit = key)} 
        data={Unit} 
        save='key'
        defaultOption={Unit[element.unit]}
        />
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
