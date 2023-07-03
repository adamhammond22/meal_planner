import React from 'react'
import { StatusBar } from 'expo-status-bar';
import exampleComponent from './exampleComponent';
/* Import all core react native components here */
import { StyleSheet, Text, View } from 'react-native';

// This is an example of JSX, an extenstion of javascript. JSX is used to create our elements
export default function App() {
  const message = "Goodbye, World"
  console.log("Hello, World")
  return (
    <View style={{height:500, width:500, backgroundColor: 'blue'}}>
      <Text>Hello, World!</Text>
      <Text>{message}</Text>
      {exampleComponent}
      <Text>Fuck</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
