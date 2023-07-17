import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image, useEffect} from 'react-native'
import { useFonts } from 'expo-font';

const editStyles = StyleSheet.create({

    backgroundColor: {
      flex:1,
      backgroundColor: '#031E33'
    },
    decriptionInput:{
         fontFamily: 'Orienta',
        fontSize: 15,
        color: '#062D4A',
        borderWidth:  1, 
        marginTop: 0, 
        marginBottom: 10, 
        marginLeft: 20, 
        marginRight: 20, 
        padding: 10, 
        textAlign: 'center',
    },
    recipeName: {
        fontFamily: 'Orienta',
        fontSize: 15,
        color: '#062D4A',
        textAlign: 'center',
        borderWidth:  1,
        marginTop: 0,
        marginBottom: 5, 
        marginLeft: 20, 
        marginRight: 20, 
        padding: 10, 
        textAlign: 'center', 
        fontWeight: 'bold'
      },
      descriptionStyle: {
        fontFamily: 'Orienta',
        fontSize: 15,
        color: '#062D4A',
        textAlign: 'center'
        
      },
      sectionText: {
        fontFamily: 'Orienta',
        fontSize: 15,
        color: '#545252',
        textAlign: 'left',
        paddingLeft: 10,
        paddingTop: 7,
        paddingRight: 15 
      },
      sectionHeaders: {
        fontFamily: 'Orienta',
        fontSize: 20,
        color: '#EDBD65',
        textAlign: 'left',
        paddingLeft: 30,
        paddingTop: 20 
      },
      flatlistContainer: {
        backgroundColor: '#293137',
        marginVertical: 15,
        marginHorizontal: 30,
        paddingTop: 5,
        paddingBottom: 11,
        justifyContent: 'center',
        borderRadius: 7
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 7,
        borderRadius: 4,
        elevation: 3
      },
      buttonText: {
        fontFamily: 'Orienta',
        fontSize: 15,
        color: '#062D4A',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingRight: 5
      },
      parent: {
        width: 60,
        height: 30,
        backgroundColor: '#EDBD65',
        margin: 20,
        borderRadius: 3
      },
      buttomButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      },
  });
  export {editStyles}



//   , borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}