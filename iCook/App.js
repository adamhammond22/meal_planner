import React from 'react'

/*
SafeAreaView can wrap our entire app to ensure elements are visible to all supported devices
StyleSheet is for our custom styles, this can be used to avoid the 'bad form' of inline styles
*/
/* Import all core react native components here */
import { StyleSheet, SafeAreaView, Button, Text} from 'react-native'

// Screen Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()





// Imported calls from viewRecipe.js
import {ViewRecipe, LoadRecipe, EditRecipe} from './src/viewRecipe'
// Imported calls for the mock-up database in tempFakeSave.js
import {GetNameList} from './src/tempFakeSave'


// This is an example of JSX, an extenstion of javascript. JSX is used to create our elements
const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
    {/* These containers allow for navigation between screens */}
    <NavigationContainer>
      {/* The initalRouteName prop declares the inital screen navigated to on startup */}
      <Stack.Navigator
      initialRouteName = 'Main-List'>
        {/* Stack.Screen defines the different screens that can be accessed. 
        The AddRecipe screen is yet to be create, so it has been left commented out */}
        <Stack.Screen name="Main-List" component={MainList} />
        {/* <Stack.Screen name="Add-Recipe" component={AddRecipe} /> */}
        <Stack.Screen name="View-Recipe" component={ViewRecipe} />
        <Stack.Screen name="Edit-Recipe" component={EditRecipe} />
        <Stack.Screen name="Delete-Recipe" component={EditRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
  )
}

{/* This is a basic main list stand in mock-up. The actual one should be created in it's own .js file. */}

const MainList = ({ navigation }) => {
  /* This is just initalizing the 2 recipe names for the mockup. */
  const nameList = GetNameList();
  /* This function is meant to load the selected recipe and navigate to the view recipe screen. The SelectRecipe() function
  will need to be updated to eventually search the database by whatever the relevent database id for the object is, as currently
  it just takes in a string and check the two data mock-up variables to see if either matches */
  const SelectRecipe = ( recipe ) => {
    console.log(recipe)
    LoadRecipe( recipe )
    navigation.replace('View-Recipe')
  }
  return (
    <>
      {/* These buttions are load recipe A or B respectivly. Their text matches whatever the current name of those variable currently is */}
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
