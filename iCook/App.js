import React from 'react'


/* Import all core react native components here

-  SafeAreaView can wrap our entire app to ensure elements are visible to all supported devices
-  StyleSheet is for our custom styles, this can be used to avoid the 'bad form' of inline styles
*/
import { StyleSheet, SafeAreaView, Button, Text} from 'react-native'

// Screen Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Import global stylesheet */
import globalStyles from './src/globalStyles'

const Stack = createNativeStackNavigator()


// Imported calls from viewRecipe.js
import {ViewRecipe, LoadRecipe, EditRecipe} from './src/viewRecipe'

// Import MultipleRecipeScreen
import MultipleRecipesScreen from './src/screens/multipleRecipesScreen'

const App = () => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
    {/* These containers allow for navigation between screens */}
    <NavigationContainer>
      {/* The initalRouteName prop declares the inital screen navigated to on startup */}
      <Stack.Navigator
      initialRouteName = 'Multi-Screen'>
        {/* Stack.Screen defines the different screens that can be accessed. 
        The AddRecipe screen is yet to be create, so it has been left commented out */}
        <Stack.Screen name="Multi-Screen" component={MultipleRecipesScreen} />
        {/* <Stack.Screen name="Add-Recipe" component={AddRecipe} /> */}
        <Stack.Screen name="View-Recipe" component={ViewRecipe} />
        <Stack.Screen name="Edit-Recipe" component={EditRecipe} />
        <Stack.Screen name="Delete-Recipe" component={EditRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
  )
}

export default App