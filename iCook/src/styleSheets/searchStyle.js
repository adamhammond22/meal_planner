import { StyleSheet } from 'react-native'
import { primaryContainerColor, primaryTextColor, deleteButtonColor } from './globalStyle';
import { UIImagePickerPreferredAssetRepresentationMode } from 'expo-image-picker';

const inputTextColor = '#545252'
const inputBackgroundColor = '#D9D9D9'

const SearchBarHeight = 40
const SearchBarWidth = '90%'

const searchStyles = StyleSheet.create({
  // Containers -------------------------------------------------------------------------------

  // Entire Search Container Style
  searchContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },


  // Searchbar -------------------------------------------------------------------------------

  //Containers for searchbar and it's input field
  searchbarContainerStyle: {
    height: SearchBarHeight,
    width: SearchBarWidth,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainerStyle: {
    backgroundColor: primaryContainerColor,
    color: primaryTextColor,
    height: SearchBarHeight,
    width: '100%',
  },
  // style of user unputted text
  //NOTE: placeholder text color is a hardcoded prop in the Searchbar JSX BY DESIGN, so go there to change it!
  inputStyle:{
    color: primaryTextColor,
    fontFamily: 'Orienta-Regular',
  },


  // Previous Searches -------------------------------------------------------------------------------
  
  // container for previous searches under the searchbar
  previousSearchContainerStyle: {
    maxWidth: SearchBarWidth,
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent:'center',
    paddingTop: 5,
  },
  previousSearchIndividualContainerStyle: {
    borderWidth: 3,
    borderColor: primaryContainerColor,
    flexDirection: 'row',
    borderRadius:10,
    margin:2,
    padding:4,
    marginHorizontal:1,
    alignItems: 'center',
  },
  previousSearchTextStyle: {
    fontSize: 18,
    fontFamily: 'Orienta-Regular',
    color: primaryTextColor,
    flexWrap: 'wrap',
    maxWidth: SearchBarWidth,
  },
  previousSearchIconStyle: {
    color: '#AFB8BA', //light light blue
  },
  previousSearchCancelContainerStyle: {
    flexDirection: 'row',
    borderRadius:10,
    margin:2,
    padding:4,
    marginHorizontal:1,
    alignItems: 'center',
  },
});
export {searchStyles}
