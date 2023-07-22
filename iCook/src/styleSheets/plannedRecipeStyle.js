import { StyleSheet } from 'react-native'
import { primaryContainerColor, primaryTextColor, deleteButtonColor, primaryBackgroundColor } from './globalStyle';
import { UIImagePickerPreferredAssetRepresentationMode } from 'expo-image-picker';

const inCartContainerWidth = 40

const plannedRecipeStyles = StyleSheet.create({
  // Containers -------------------------------------------------------------------------------

  // Styling for the Main Container
  mainContainerStyle: { display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: primaryBackgroundColor,
  },
  // Contains the Flatlist of recipes
  flatListContainerStyle: {
    flexShrink: 1,
  },
  // Contains the top buttons
  topButtonContainerStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  // Individual Recipes -------------------------------------------------------------------------------

  // Wrapper for individual recipes in the FlatList
  // RecipeInfo and inCart containers share the space inside the recipe wrapper
  recipeWrapperStyle: {
    backgroundColor: 'primaryContainerColor',
    borderRadius: 7,
    marginBottom: 5,
    marginLeft:10,
    marginRight:10,
    marginTop: 5,
    display:'flex',
    flexDirection: 'row',
  },
  
  // Recipe info container contains all recipe information
  recipeInfoContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
    backgroundColor: primaryContainerColor,
    padding: 8,
    paddingBottom: 25,
    width: '80%',
  },

  //recipe description styling
  descripTextStyle:{
    fontFamily: 'Orienta-Regular',
    alignSelf: 'flex-start',
    color: '#AFB8BA',
    fontWeight: '400',
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 12,
  },
  // recipe name styling
  recipeStyle: {
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


  // inCart container holds all inCart information and buttons
  inCartContainerStyle: {
    width: inCartContainerWidth,
    display:'flex',
    backgroundColor: primaryContainerColor,
    justifyContent:"space-between",
    alignItems: 'center'
  },

  // inCart text, icon, and button styling
  inCartTextStyle: {
    fontFamily: 'Orienta-Regular',
    fontSize: 20,
    color: primaryTextColor,
  },
  inCartIconStyle: {
    color: primaryTextColor,
  },
  inCartButtonStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Send to Shopping Button -------------------------------------------------------------------------------

  sendToShoppingStyle: {
    borderWidth: 1,
    backgroundColor: primaryTextColor,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 50,
    paddingLeft: 50
  },

  sendToShoppingTextStyle: {
    fontFamily: 'Orienta-Regular',
    fontSize: 18,
    color: primaryContainerColor
  },

  sendToShoppingIconStyle: {
    color: primaryContainerColor,
  },

 // Clear Planned Recipes Button -------------------------------------------------------------------------------

 clearPlannedRecipesStyle: {
  borderWidth: 1,
    backgroundColor: primaryTextColor,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 50,
    paddingLeft: 50
},

clearPlannedRecipesTextStyle: {
  fontFamily: 'Orienta-Regular',
  flex: 1,
  flexWrap: 1,
  alignContent: 'center',
  fontSize: 18,
  color: primaryContainerColor,
},

clearPlannedRecipesIconStyle: {
  paddingLeft: 10,
  color: primaryContainerColor,
},

title: {
  marginTop: 30,
  fontFamily: 'Tangerine-Regular',
  fontSize: 64,
  color: primaryTextColor,
  textAlign: 'center',
},

loading: {
  backgroundColor: primaryBackgroundColor,
  height: '100%',
},

});
export {plannedRecipeStyles}
