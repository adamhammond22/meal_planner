import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image, useEffect} from 'react-native'
import { useFonts } from 'expo-font';
import './globalStyle'
import { primaryTextColor, primaryContainerColor } from './globalStyle';

const viewStyles = StyleSheet.create(
    {
    recipeNameStyle: {
        paddingTop: 20,
        fontFamily: 'Tangerine-Regular',
        fontSize: 64,
        color: primaryTextColor,
        textAlign: 'center'
    },
    recipeDescriptionStyle: {
        fontFamily: 'Orienta-Regular',
        fontSize: 15,
        color: primaryTextColor,
        textAlign: 'center'
    },
    recipeIngredientStyle: {
        fontFamily: 'Orienta-Regular',
        marginTop: 5,
        marginLeft: 15, 
        marginRight: 15, 
        padding: 0, 
        textAlign: 'left', 
        color: primaryTextColor, 
        fontSize: 15
    },
    recipeTagStyle: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        padding: 0,
        textAlign: 'left',
        color: primaryTextColor,
        fontSize: 15,
        fontFamily: 'Orienta-Regular'
    },
    sectionTextStyle: {
        fontFamily: 'Ovo-Regular',
        fontSize: 15,
        color: primaryTextColor,
        textAlign: 'left',
        paddingLeft: 15,
        paddingTop: 5,
        paddingRight: 15 
    },
    sectionHeaderStyle: {
        fontFamily: 'Orienta-Regular',
        fontSize: 20,
        color: primaryTextColor,
        textAlign: 'left',
        paddingLeft: 30,
        paddingTop: 20 
    },
    flatlistContainerStyle: {
      backgroundColor: primaryContainerColor,
      marginVertical: 15,
      marginHorizontal: 30,
      paddingTop: 5,
      paddingBottom: 11,
      justifyContent: 'center',
      borderRadius: 7
    },
});
export {viewStyles}