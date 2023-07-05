import React, { useState } from 'react'

/* Import all core react native components here */

// Screen Navigation imports
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
/*
SafeAreaView can wrap our entire app to ensure elements are visible to all supported devices
StyleSheet is for our custom styles, this can be used to avoid the 'bad form' of inline styles
*/

import { StyleSheet, SafeAreaView, Button, Text, TextInput, View } from 'react-native'


// This is an example of JSX, an extenstion of javascript. JSX is used to create our elements
const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
    {/* These containers allow for navigation between screens */}
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName = 'Main-List'>
        {/* Stack.Screen defines the different screens that can be accessed */}
        <Stack.Screen name="Main-List" component={MainList} />
        {/* <Stack.Screen name="Add-Recipe" component={AddRecipe} /> */}
        <Stack.Screen name="View-Recipe" component={ViewRecipe} />
        <Stack.Screen name="Edit-Recipe" component={EditRecipe} />
        <Stack.Screen name="Delete-Recipe" component={EditRecipe} />
        {/* <Stack.Screen name="Select-Recipes" component={SelectRecipes} /> */}
        {/* <Stack.Screen name="Meal-Plan" component={SelectRecipes} /> */}
        {/* <Stack.Screen name="Shopping-List" component={SelectRecipes} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
  )
}

const Unit = Object.freeze({
  None: Symbol(0),
  Teaspoon: Symbol(1),
  TableSpoon: Symbol(2),
  FLOunce: Symbol(3),
  Cup: Symbol(4),
  Pint: Symbol(5),
  Quart: Symbol(6),
  Gallon: Symbol(7),
  Ounce: Symbol(8),
  Pound: Symbol(9)
})

let saveARecipe = {
  name: 'Recipe A',
  ingredients: ['Letters', 'Purple'],
  ingredientUnits: [Unit.Cup, Unit.Ounce],
  ingredientQuantity: [0.25, 19.5],
  instructions: '1) Add Letters into a large bowl\n2) Consume Purple\n3) Profit'
}

let saveBRecipe = {
  name: 'Recipe B',
  ingredients: ['Wind', 'Salt', 'Space-Time'],
  ingredientUnits: [Unit.Gallon, Unit.TableSpoon, Unit.Pound],
  ingredientQuantity: [8, 2, 5],
  instructions: '1) Filter wind through a strainer\n2) Season the Space-Time with the salt\n3) Enjoy newfound timetravel abilities\n\n\n4) Restore the ruined timelines'
}


let loadedRecipe = {
  name: '',
  ingredients: [],
  ingredientUnits: [],
  instructions: ''
}
let originalLoadedName

const SaveRecipe = () => {
  if(originalLoadedName == saveARecipe.name){
    saveARecipe = loadedRecipe
    console.log("Save A")
  }else if(originalLoadedName == saveBRecipe.name){
    saveBRecipe = loadedRecipe
    console.log("Save B")
  }else{
    console.log("Save Error")
    console.log(originalLoadedName)
  }
}

const LoadRecipe = ( name ) => {
  originalLoadedName = name
  if(name == saveARecipe.name){
    loadedRecipe = saveARecipe
  }else if(name == saveBRecipe.name){
    loadedRecipe = saveBRecipe
  }else{
    console.log("Load Error")
  }
}

const MainList = ({ navigation }) => {
  const textA = saveARecipe.name
  const textB = saveBRecipe.name
  const SelectRecipe = ( recipe ) => {
    console.log(recipe)
    LoadRecipe( recipe )
    navigation.replace('View-Recipe')
  }
  return (
    <>
      {/* This is a button that, when clicked, will load a differnet screen */}
      <Button
        title = {textA}
        onPress={() => SelectRecipe(textA)}
      />
      <Button
        title = {textB}
        onPress={() => SelectRecipe(textB)}
      />{/* */}
    </>
  )
}

const ViewRecipe = ({ navigation }) => {
  const SelectRecipe = ( recipe ) => {
      LoadRecipe( recipe )
      navigation.replace('View-Recipe')
  }
  return (
    <><Text 
      style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10}}>
      {loadedRecipe.name}
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
  )
}

const EditRecipe = ({ navigation }) => {
  const [nameText, setNameText] = useState(loadedRecipe.name)
  {/* This function handles updates everytime the user changes the text in the textbox */}
  const handleNameInput = ( newText ) => {
    setNameText(newText)
  }
  const SaveEdit = () => {
      loadedRecipe.name = nameText
      SaveRecipe()
      navigation.replace('View-Recipe')
  }
  return (
    <>
      <TextInput
        style={{borderWidth:  1, marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10}}
        editable
        multiline
        onChangeText={value => handleNameInput(value)}
        defaultValue={loadedRecipe.name}
      />
      <Button
        title = {'Save'}
        onPress={() => SaveEdit()}
      />
      <Button
        title = {'Cancel'}
        onPress={() => navigation.replace('View-Recipe')}
      />
    </>
  )
}




/* If our newly added style inexplicably doesnt work, we likely messed up the prop name.
check this: https://reactnative.dev/docs/view-style-props */

/* Here is our global stylesheet, consider migrating it to it's own file eventually? */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1
  }
})
export default App
