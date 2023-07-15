import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import LottieView from 'lottie-react-native';

import globalStyles from './src/globalStyles'

import { ViewRecipe, LoadRecipe, EditRecipe } from './src/viewRecipe'
import MultipleRecipesScreen from './src/screens/multipleRecipesScreen'

// Define other screens...
import CalendarScreen from './src/screens/CalendarScreen.jsx'; 
import LoginScreen from './src/screens/LoginScreen.jsx'; 
import ShopScreen from './src/screens/ShopScreen.jsx'; 
import ShareScreen from './src/screens/ShareScreen.jsx';
import { HeaderTitle } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create a new Home component that includes your Stack Navigator
function Home() {
  return (
    <Stack.Navigator initialRouteName='Multi-Screen'>
      <Stack.Screen 
      screenOptions={{headerShown: false}}
        name="Multi-Screen" 
        component={MultipleRecipesScreen} 
        options={{ headerShown: false }} // this line hides the header
      />
      <Stack.Screen name="View-Recipe" component={ViewRecipe}/>
      <Stack.Screen name="Edit-Recipe" component={EditRecipe} />
      <Stack.Screen name="Delete-Recipe" component={EditRecipe}/>
    </Stack.Navigator>
  );
}
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to show the Lottie animation
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Change the delay time as needed
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('./assets/co-chef.json')} // Update the path to your animation file
          autoPlay
          loop
        />
      </View>
    );
  }

  return (

    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({

            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Calendar') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Shop') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Share') {
                iconName = focused ? 'share-social' : 'share-social-outline';
              } else if (route.name === 'Login') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            
            tabBarActiveTintColor: 'black',  
            tabBarInactiveTintColor: 'gray',
            headerStyle:{
              backgroundColor: '#EDBD65',
            },
            headerTitleStyle : {
              fontWeight: 'bold',
              fontSize: 24,
            
            },
            tabBarStyle: {display: "absolute",
                          backgroundColor: '#EDBD65'},
                    
            })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="Share" component={ShareScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDBD65',
  },
});

export default App;