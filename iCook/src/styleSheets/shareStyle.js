import { StyleSheet } from 'react-native'
import {primaryBackgroundColor, primaryTextColor, primaryContainerColor} from '../styleSheets/globalStyle'

const shareStyle = StyleSheet.create({
    shareScreen: {
        flex:1,
        backgroundColor: primaryBackgroundColor
    },
    shareTitle: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareText: {
        color: primaryTextColor, 
    },
    shareButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    shareButton: {
        fontFamily: 'Orienta-Regular',
        color: primaryTextColor,
        fontSize: 15,
        alignContent:"center",
        justifyContent:"center",
        fontSize: 24,
        marginTop: 10,
        marginRight: 10,
        fontWeight: 'bold'
    }
});

export {shareStyle};
