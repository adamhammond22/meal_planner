/* This is the NEW App.js from the project initalization, i am leaving it here as a reference for now */
import React from 'react'

/* Import all core react native components here */
/*
SafeAreaView can wrap our entire app to ensure elements are visible to all supported devices
StyleSheet is for our custom styles, this can be used to avoid the 'bad form' of inline styles
*/

import { StyleSheet, SafeAreaView, Text, View } from 'react-native'

import helloWorldComponent from './src/helloWorldComponent'

// This is an example of JSX, an extenstion of javascript. JSX is used to create our elements
const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={{ color: 'yellow' }}>Goodbye World!</Text>
      </View>
      {helloWorldComponent()}
    </SafeAreaView>
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
