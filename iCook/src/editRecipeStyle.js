import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image, useEffect} from 'react-native'
import { useFonts } from 'expo-font';

const editStyles = StyleSheet.create({

    backgroundColor: {
      flex:1,
      backgroundColor: '#983429'
    },
    decriptionInput:{
         fontFamily: 'Orienta',
        fontSize: 15,
        color: '#EDBD65',
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
        color: '#EDBD65',
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
        color: '#EDBD65',
        textAlign: 'center'
        
      },
      sectionText: {
        fontFamily: 'Orienta',
        fontSize: 15,
        color: '#EDBD65',
        textAlign: 'left',
        paddingLeft: 15,
        paddingTop: 5,
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
        elevation: 3,
        backgroundColor: '#983429',
      },
      buttonText: {
        fontFamily: 'Orienta',
        fontSize: 15,
        color: '#E29137',
        textAlign: 'center',
        fontWeight: 'bold'
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
      }
  });
  export {editStyles}



//   , borderWidth:  1, marginTop: 20, marginBottom: 5, marginLeft: 20, marginRight: 20, padding: 10, textAlign: 'center', fontWeight: 'bold'}