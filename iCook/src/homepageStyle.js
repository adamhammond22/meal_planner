import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image, useEffect} from 'react-native'
import { useFonts } from 'expo-font';

export default function App() {
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Orienta': require('./fonts/Orienta-Regular.ttf')
      });
    };
  
    loadFont();
  }, []);
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: 'grey',
    //   alignItems: 'center'
    // },
    // wrapper: {
    //   flex: 1
    // },
    home: {
      flex:1,
      backgroundColor: '#983429'
    
    },
    recipeWrapper: {
      display:'flex',
      backgroundColor: '#293137',
      borderRadius: 7,
      marginBottom: 5,
      marginLeft:10,
      marginRight:10,
      marginTop: 5,
      flexDirection: 'column',
      justifyContent:"center",
    },
    recipe: {
      fontFamily: 'Orienta',
      alignSelf: 'flex-start',
      justifyContent:"space-between",
      alignSelf:"auto",
      color: '#EDBD65',
      textAlign: 'left',
      paddingLeft: 15,
      paddingTop: 10,
      fontSize: 24,
      fontWeight: '400',
    },
    recipeButton:{
      fontFamily: 'Orienta',
      color: '#EDBD65',
      fontSize: 15,
      flexDirection:'row',
      alignItems:'flex-end',
      // alignContent:"center",
      // justifyContent:"center",
      // fontFamily: 'Orienta',
      fontWeight: '400',
    },
    button:{
      fontFamily: 'Orienta',
      color: 'white',
      fontSize: 20,
      alignContent:"center",
      justifyContent:"center",
      // fontFamily: 'Orienta',
      fontWeight: 'bold',
      // wordWrap: 'break-word'
    },
    title: {
      fontFamily: 'Orienta',
      color: '#EDBD65',
      fontSize: 30,
      textAlign: 'center',
      // textDecorationLine:'underline',
      // textTransform: 'uppercase',
      marginBottom: 15,
    },
    description:{
      fontFamily: 'Orienta',
      color: '#EDBD65',
      textAlign:"left",
    },
    images:{
      height:100,
      width:100,
      flexWrap:"wrap",
      flexDirection:"column",
      justifyContent:"center",
      resizeMode: 'contain',
    },
    seperator:{
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });
  export {styles}