import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Touchable } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
// import { NavigationScreenProps } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { loadFonts, primaryBackgroundColor, primaryContainerColor, primaryTextColor } from './src/styleSheets/globalStyle';

import { ViewRecipe, LoadRecipe, EditRecipe } from './src/screens/viewRecipeScreen'
import MultipleRecipesScreen from './src/screens/multipleRecipesScreen'

import MealCartScreen from './src/screens/MealCartScreen.jsx'; 
import PlannedRecipeScreen from './src/screens/PlannedRecipesScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import LoginScreen from './src/screens/LoginScreen.jsx'; 
import { Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// Create a new Home component that includes your Stack Navigator
function Home({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Multi-Screen">
      <Stack.Screen
        name="Multi-Screen"
        component={MultipleRecipesScreen}
        options={{ headerShown: false }}
        // onPress={() => navigation.navigate(MultipleRecipesScreen)}
        // options={({ navigation }) => ({
        //   HomeScreen: () => (
        //     <TouchableOpacity onPress={() => navigation.replace(MultipleRecipesScreen)} />
        //   ),
        // })}
    
      />
      <Stack.Screen name="View-Recipe" component={ViewRecipe} />
      <Stack.Screen name="Edit-Recipe" component={EditRecipe} />
      <Stack.Screen name="Delete-Recipe" component={EditRecipe} />
    </Stack.Navigator>
  );
}


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  loadFonts()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading){//} || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('./assets/co-chef.json')}
          autoPlay
          loop
        />
      </View>
    );
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryBackgroundColor}}>
      <NavigationContainer>
        <Tab.Navigator 
        initialRouteName="Multi-Screen"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Calendar') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Meal Planner') {
                iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
              } else if (route.name === 'Shopping List') {
                iconName = focused ? 'receipt' : 'receipt-outline';
              } else if (route.name === 'Login') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'silver',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontFamily: 'Tangerine-Regular',
              color: primaryTextColor,
              fontWeight: 'bold', 
              fontSize: 24,
            },
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: primaryContainerColor,
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} 
           options={({ navigation }) => ({
            tabBarButton: (props) => (
              <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate("Multi-Screen");
              }}
            />
            ),
          })}/>
          <Tab.Screen name="Calendar" component={MealCartScreen} />
          <Tab.Screen name="Meal Planner" component={PlannedRecipeScreen} options={{unmountOnBlur: true}}/>
          <Tab.Screen name="Shopping List" component={ShoppingListScreen} options={{unmountOnBlur: true}}/>
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#062D4A',
  },
});

export default App;
