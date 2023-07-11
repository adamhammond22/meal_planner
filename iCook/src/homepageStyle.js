import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image} from 'react-native'
import { useFonts } from 'expo-font';
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
      backgroundColor: 'rgba(152, 52, 41, 1)'
    
    },
    recipeWrapper: {
      display:'flex',
      backgroundColor: 'rgba(41, 49, 55, 1)',
      borderRadius: 10,
      marginBottom: 10,
      marginLeft:10,
      marginRight:10,
      marginTop: 10,
      flexDirection: 'column',
      justifyContent:"center",
    },
    recipe: {
      fontFamily: 'Orienta',
      alignSelf: 'flex-start',
      justifyContent:"space-between",
      alignSelf:"auto",
      color: '#EDBD65',
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '400',
    },
    recipeButton:{
      fontFamily: 'Orienta',
      color: 'white',
      fontSize: 20,
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
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      // textDecorationLine:'underline',
      // textTransform: 'uppercase',
      marginBottom: 15,
    },
    description:{
      fontFamily: 'Orienta',
      color: '#EDBD65',
      textAlign:"center",
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