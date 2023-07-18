import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

import globalStyles from './src/globalStyles';

import { ViewRecipe, LoadRecipe, EditRecipe } from './src/viewRecipe';
import MultipleRecipesScreen from './src/screens/multipleRecipesScreen';

import CalendarScreen from './src/screens/CalendarScreen.jsx'; 
import LoginScreen from './src/screens/LoginScreen.jsx'; 
import ShopScreen from './src/screens/ShopScreen.jsx'; 
import ShareScreen from './src/screens/ShareScreen.jsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator initialRouteName="Multi-Screen">
      <Stack.Screen
        name="Multi-Screen"
        component={MultipleRecipesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="View-Recipe" component={ViewRecipe} />
      <Stack.Screen name="Edit-Recipe" component={EditRecipe} />
      <Stack.Screen name="Delete-Recipe" component={EditRecipe} />
    </Stack.Navigator>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'Orienta': require('./assets/fonts/Orienta-Regular.ttf'),
    'Ovo-Regular': require('./assets/fonts/Ovo-Regular.ttf'),
    'TangerineRegular': require('./assets/fonts/Tangerine-Regular.ttf'),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading || !fontsLoaded) {
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
    <SafeAreaView style={{ flex: 1 }}>
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
            tabBarActiveTintColor: 'silver',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#062D4A',
            },
            headerTitleStyle: {
              fontFamily: 'TangerineRegular',
              color: '#ECEAE4',
              fontWeight: 'bold', 
              fontSize: 24,
            },
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: '#062D4A',
            },
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
