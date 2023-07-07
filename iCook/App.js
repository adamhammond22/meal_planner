import React from 'react'

/* Import all core react native components here */

// Screen Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()
/*
SafeAreaView can wrap our entire app to ensure elements are visible to all supported devices
StyleSheet is for our custom styles, this can be used to avoid the 'bad form' of inline styles
*/

import { StyleSheet, SafeAreaView, Button, Text} from 'react-native'



import {ViewRecipe, LoadRecipe, EditRecipe} from './src/viewRecipe'
import {GetNameList} from './src/tempFakeSave'


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


const MainList = ({ navigation }) => {
  const nameList = GetNameList();
  const SelectRecipe = ( recipe ) => {
    console.log(recipe)
    LoadRecipe( recipe )
    navigation.replace('View-Recipe')
  }
  return (
    <>
      {/* This is a button that, when clicked, will load a differnet screen */}
      <Button
        title = {nameList[[0]]}
        onPress={() => SelectRecipe(nameList[0])}
      />
      <Button
        title = {nameList[1]}
        onPress={() => SelectRecipe(nameList[0])}
      />{/* */}
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
