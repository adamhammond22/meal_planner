import { useState } from 'react'

import { StyleSheet, Button, Text, TextInput, View, ScrollView} from 'react-native'

import InputScrollView from 'react-native-input-scroll-view'

import {Load, Save} from './tempFakeSave'


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


let loadedRecipe = {
    name: 'Unloaded Error',
    ingredients: [{name: 'One', unit: Unit.Gallon, amount: 1}, {name: 'Two', unit: Unit.Pound, amount: 2}],
    instructions: 'Return to main menu. Do not pass Go. Do not collect $200.'
}

let originalLoadedName = ' '
  
 
  
const SaveRecipe = () => {
    Save(originalLoadedName, loadedRecipe);
}
  
export const LoadRecipe = ( name ) => {
    loadedRecipe = Load( name )
    originalLoadedName = loadedRecipe.name
}

export const ViewRecipe = ({ navigation }) => {
    const ingredientList = []
    loadedRecipe.ingredients.forEach((element, index) => {
      if (element.unit == ' '){
        if(element.amount > 0 && element.amount <= 1){
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
              {element.amount} {element.name}
            </Text>
          );
        }else{
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
              {element.amount} {element.name}s
            </Text>
          )
        }
      } else {
        if(element.amount > 0 && element.amount <= 1){
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
          {element.amount} {element.unit} of {element.name}
          </Text>
        )
         }else{
          ingredientList.push(
            <Text style={{marginLeft: 28, marginRight: 28, padding: 2, textAlign: 'left'}}>
          {element.amount} {element.unit}s of {element.name}
          </Text>
        )
        }
      }
    });
  
    return (
    <ScrollView>
      <><Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left', fontWeight: 'bold'}}>
        {loadedRecipe.name}
      </Text> 
  
  
      <Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left', fontWeight: 'bold'}}>
        Ingredients
      </Text> 
      {ingredientList}
  
  
      <Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}>
        Instructions
      </Text> 
      <Text 
        style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left'}}>
        {loadedRecipe.instructions}
      </Text>
        <Button
          title = {'Edit'}
          onPress={() => navigation.replace('Edit-Recipe')}
        />
        <Button
          title = {'Back'}
          onPress={() => navigation.replace('Main-List')}
        />
      </>
    </ScrollView>
    )
}
 
export const EditRecipe = ({ navigation }) => {
    const [nameText, setNameText] = useState(loadedRecipe.name)
    const [instructionsText, setInstructionText] = useState(loadedRecipe.instructions)
    {/* This function handles updates everytime the user changes the text in the textbox */}
    const SaveEdit = () => {
        loadedRecipe.name = nameText
        loadedRecipe.instructions = instructionsText
        SaveRecipe( originalLoadedName, loadedRecipe )
        navigation.replace('View-Recipe')
    }
    return (
      <>
        <InputScrollView
        keyboardOffset = {120}>
        <View>
        <TextInput
          style={{borderWidth:  1, marginTop: 30 , marginBottom: 30, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
          editable
          multiline={true}
          numberOfLines={1}
          blurOnSubmit={true}
          onChangeText={value => setNameText(value)}
          defaultValue={nameText}
        />
        <TextInput
          style={{borderWidth:  1, marginTop: 30, marginBottom: 30, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left'}}
          editable
          multiline
          scrollEnabled={false}
          onChangeText={value => setInstructionText(value)}
          defaultValue={instructionsText}
        />
        </View>
        <Button
          title = {'Save'}
          onPress={() => SaveEdit()}
        />
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
