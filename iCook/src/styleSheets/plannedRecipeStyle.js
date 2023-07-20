import { StyleSheet } from 'react-native'
import { primaryContainerColor, primaryTextColor, deleteButtonColor, primaryBackgroundColor } from './globalStyle';
import { UIImagePickerPreferredAssetRepresentationMode } from 'expo-image-picker';

const inCartContainerWidth = 40

const plannedRecipeStyles = StyleSheet.create({
  // Containers -------------------------------------------------------------------------------

  // Entire Search Container Style
  mainContainerStyle: { flex: 1,
    backgroundColor: primaryBackgroundColor,
  },
  debugButtonStyle: {
    color:'orange', 
    textAlign:'center', 
    fontSize:20,
    marginBottom: 5
  },
  debugEndLineStyle:{
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },


  recipeWrapper: {
    backgroundColor: 'primaryContainerColor',
    borderRadius: 7,
    marginBottom: 5,
    marginLeft:10,
    marginRight:10,
    marginTop: 5,
    display:'flex',
    flexDirection: 'row',
  },

  descripText:{
    fontFamily: 'Orienta-Regular',
    alignSelf: 'flex-start',
    color: '#AFB8BA',
    fontWeight: '400',
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 12,
  },
  recipe: {
    fontFamily: 'Ovo-Regular',
    alignSelf: 'flex-start',
    justifyContent:"space-between",
    alignSelf:"auto",
    color: primaryTextColor,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 24,
    fontWeight: '400',
  },
  recipeInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: primaryContainerColor,
    padding: 8,
  },
  inCartContainer: {
    width: inCartContainerWidth,
    display:'flex',
    backgroundColor: primaryContainerColor,
    justifyContent:"space-between",
    alignItems: 'center',
  },
  inCartText: {
    fontFamily: 'Orienta-Regular',
    fontSize: 20,
    color: primaryTextColor,
  },
  iconStyle: {
    color: primaryTextColor,
  },
  inCartButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export {plannedRecipeStyles}
