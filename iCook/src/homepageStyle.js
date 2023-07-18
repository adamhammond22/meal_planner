import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image, useEffect} from 'react-native'
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
      backgroundColor: '#031E33'
    
    },
    recipeWrapper: {
      display:'flex',
      backgroundColor: '#062D4A',
      borderRadius: 7,
      marginBottom: 5,
      marginLeft:10,
      marginRight:10,
      marginTop: 5,
      flexDirection: 'column',
      justifyContent:"center",
    },
    recipe: {
      fontFamily: 'Ovo-Regular',
      alignSelf: 'flex-start',
      justifyContent:"space-between",
      alignSelf:"auto",
      color: '#ECEAE4',
      textAlign: 'left',
      paddingLeft: 15,
      paddingTop: 10,
      fontSize: 24,
      fontWeight: '400',
    },
    descripText:{
      fontFamily: 'Orienta',
      alignSelf: 'flex-start',
      color: '#AFB8BA',
      fontWeight: '400',
      paddingTop: 10,
      paddingLeft: 15,
      fontSize: 12,
    },
    recipeButton:{
      fontFamily: 'Orienta',
      color: '#ECEAE4',
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
      color: '#ECEAE4',
      fontSize: 15,
      alignContent:"center",
      justifyContent:"center",
      marginTop: 10,
      marginBottom: -38,
      // fontFamily: 'Orienta',
      fontWeight: 'bold',
      // wordWrap: 'break-word'
    },
    title: {
      fontFamily: 'TangerineRegular',
      color: '#ECEAE4',
      fontSize: 64,
      textAlign: 'center',
      // textDecorationLine:'underline',
      // textTransform: 'uppercase',
      marginBottom: 15,
    },
    description:{
      fontFamily: 'Orienta',
      color: '#062D4A',
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