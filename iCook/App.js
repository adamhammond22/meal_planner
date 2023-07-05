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
  None: ' ',
  Teaspoon: ' teaspoon ',
  TableSpoon: ' tablespoon ',
  FLOunce: ' fl oz ',
  Cup: ' cup ',
  Pint: ' pint ',
  Quart: ' quart ',
  Gallon: ' gallon ',
  Ounce: ' oz ',
  Pound: ' lb '
})

let saveARecipe = {
  name: 'Recipe A',
  ingredients: [{name: 'Letters', unit: Unit.Cup, amount: 0.25 }, {name: 'Purple', unit: Unit.Ounce, amount: 19.5}],
  instructions: '1) Add Letters into a large bowl\n2) Consume Purple\n3) Profit'
}

let saveBRecipe = {
  name: 'Recipe B',
  ingredients: [{name: 'Wind', unit: Unit.Gallon, amount: 8}, {name: 'Salt', unit: Unit.TableSpoon, amount: 2}, 
  {name: 'Space-Time', unit: Unit.Pound, amount: 5}],
  instructions: '1) Filter wind through a strainer\n2) Season the Space-Time with the salt\n3) Enjoy newfound timetravel abilities\n...\n...\n4) Restore the ruined timelines'
}


let loadedRecipe = {
  name: 'Unloaded Error',
  ingredients: [{name: 'One', unit: Unit.Gallon, amount: 1}, {name: 'Two', unit: Unit.Pound, amount: 2}],
  instructions: 'Return to main menu. Do not pass Go. Do not collect $200.'
}
let originalLoadedName = ''

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
  const ingredientList = []
  loadedRecipe.ingredients.forEach((element, index) => {
    console.log(element.unit)
    console.log(element.unit)
    ingredientList.push(
      <Text style={{marginLeft: 20, marginRight: 20, padding: 2, textAlign: 'left'}}>
      {element.amount}{element.unit}of {element.name}
      </Text> 
    );
  });

  return (
    <><Text 
      style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}>
      {loadedRecipe.name}
    </Text> 
    {ingredientList}
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
  )
}

const EditRecipe = ({ navigation }) => {
  const [nameText, setNameText] = useState(loadedRecipe.name)
  const [instructionsText, setInstructionText] = useState(loadedRecipe.name)
  {/* This function handles updates everytime the user changes the text in the textbox */}
  const SaveEdit = () => {
      loadedRecipe.name = nameText
      loadedRecipe.instructions = instructionsText
      SaveRecipe()
      navigation.replace('View-Recipe')
  }
  return (
    <>
      <TextInput
        style={{borderWidth:  1, marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}}
        editable
        multiline
        onChangeText={value => setNameText(value)}
        defaultValue={loadedRecipe.name}
      />
      <TextInput
        style={{borderWidth:  1, marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'left'}}
        editable
        multiline
        onChangeText={value => setInstructionText(value)}
        defaultValue={loadedRecipe.instructions}
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
