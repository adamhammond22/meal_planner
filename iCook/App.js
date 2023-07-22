import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
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
function HomeScreen({ navigation }) {
  return (
    
    
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate(MultipleRecipesScreen)}
      />
  );
}

function MyTabBar({ navigation }) {
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate(MultipleRecipesScreen);
      }}
    />
  );
}


const customTab = (
  <TouchableOpacity>
   onPress => {() => navigation.navigate(MultipleRecipesScreen) }
  </TouchableOpacity>

);

const navToHome =({navigation}) => (
  navigation.navigate(MultipleRecipesScreen)
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  /*const [fontsLoaded] = useFonts({
    'Orienta': require('./assets/fonts/Orienta-Regular.ttf'),
    'Ovo-Regular': require('./assets/fonts/Ovo-Regular.ttf'),
    'TangerineRegular': require('./assets/fonts/Tangerine-Regular.ttf'),
  });*/
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
          // tabBar={props => <MyTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Calendar" component={MealCartScreen} />
          <Tab.Screen name="Planned Recipes" component={PlannedRecipeScreen} options={{unmountOnBlur: true}}/>
          <Tab.Screen name="Shopping List" component={ShoppingListScreen} options={{unmountOnBlur: true}}/>
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

// ptions={{ tabBarButton: (props) => (
//   <TouchableOpacity {...props} onPress = {() => navigation.navigate(MultipleRecipesScreen) } />
//    ),
//  }} 
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
