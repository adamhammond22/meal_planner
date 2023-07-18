import { StyleSheet } from 'react-native'
import {SafeAreaView, Button, Text, View, TouchableOpacity, Image, useEffect} from 'react-native'
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

export const primaryBackgroundColor = '#031E33'
export const primaryTextColor = '#ECEAE4'
export const primaryContainerColor = '#062D4A'//'#062D4A'
export const globalStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: primaryBackgroundColor,
        marginBottom: 45
    },
    bottomButtonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    parentStyle: {
        width: 60,
        height: 30,
        backgroundColor: primaryTextColor,
        margin: 20,
        borderRadius: 3
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 7,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: primaryTextColor,
    },
    buttonTextStyle: {
        fontFamily: 'Orienta-Regular',
        fontSize: 15,
        color: primaryContainerColor,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    imageContainerStyle: { 
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    imageStyle: {
        width: 300, 
        height: 200, 
        borderRadius: 12.5 
    }
})