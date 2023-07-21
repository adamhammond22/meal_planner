import { StyleSheet } from 'react-native'
import * as Font from 'expo-font';

export const primaryBackgroundColor = '#031E33' //dark blue
export const primaryTextColor = '#ECEAE4' //cream
export const primaryContainerColor = '#062D4A' //lighter blue
export const deleteButtonColor = '#EF0107' //red

export const loadFonts = async () =>{
    await Font.loadAsync({
        'Orienta-Regular': require('../../assets/fonts/Orienta-Regular.ttf'),
        'Ovo-Regular': require('../../assets/fonts/Ovo-Regular.ttf'),
        'Tangerine-Regular': require('../../assets/fonts/Tangerine-Regular.ttf'),
    })
}

export const globalStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: primaryBackgroundColor,
        marginBottom: 45
    },

    // Main Button Styles ------------------------------------------------------------
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
        fontWeight: 'bold',
        color: 'red'
    },

    // Image Styles ----------------------------------------------------------------------
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