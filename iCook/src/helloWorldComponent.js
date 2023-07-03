/* helloWorldComponent.js is another example component */
import React from 'react'
import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// This is an example of JSX, an extenstion of javascript. JSX is used to create our elements
const helloWorldComponent = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={{ color: 'green' }}>Hello World!</Text>
        <AntDesign name="smile-circle" size={24} color="blue" />
      </View>
    </SafeAreaView>
  )
}

/* Here is our stylesheet */
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

export default helloWorldComponent
