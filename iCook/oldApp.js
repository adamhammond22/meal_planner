/* This is the OLD App.js from the project initalization, i am leaving it here as a reference for now! */
import React from 'react'
// import { StatusBar } from 'expo-status-bar';
// /* Import all core react native components here */
import { Text, View } from 'react-native'

// This is an example of JSX, an extenstion of javascript. JSX is used to create our elements
export default function App() {
  const message = 'Goodbye, World'
  console.log('Hello, World')
  return (
    <View style={{ height: 500, width: 500, backgroundColor: 'blue' }}>
      <Text>Hello, World!</Text>
      <Text>{message}</Text>
      <Text>Fuck</Text>
    </View>
  )
}
