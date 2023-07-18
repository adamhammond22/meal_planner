import { StyleSheet } from 'react-native'
import { primaryContainerColor, primaryTextColor, deleteButtonColor, primaryBackgroundColor } from './globalStyle';

const inputTextColor = '#545252'
const inputBackgroundColor = '#D9D9D9'

const editStyles = StyleSheet.create({
  // Name Style -------------------------------------------------------------------------------
  nameInputStyle: {
    fontFamily: 'Orienta-Regular',
    fontSize: 15,
    color: inputTextColor,
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 7,
    paddingRight: 15,

    borderWidth:  1,
    marginTop: 40,
    marginBottom: 5, 
    marginLeft: 20, 
    marginRight: 20, 
    padding: 10, 
    textAlign: 'left',
    backgroundColor: inputBackgroundColor,
    borderRadius: 5
  },

  // Description Style ------------------------------------------------------------------------
  descriptionInputStyle: {
    fontFamily: 'Orienta-Regular',
    fontSize: 15,
    color: inputTextColor,
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 7,
    paddingRight: 15,

    borderWidth:  1, 
    marginTop: 0, 
    marginBottom: 10, 
    marginLeft: 20, 
    marginRight: 20, 
    padding: 10,
    textAlign: 'left',
    backgroundColor: inputBackgroundColor,
    borderRadius: 5
  },

  // Image Button Style ------------------------------------------------------------------------
  uploadImageButtonStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: primaryTextColor,
    width: 140,
    height: 30,
    marginTop: 10,
    marginBottom: 10
  },

  // Ingredient Styles --------------------------------------------------------------------------
  ingredientPanelStyle: {
    flexDirection: 'row', 
    flex: 4, 
    borderWidth:  1, 
    marginTop: 5, 
    marginBottom: 5, 
    marginLeft: 20, 
    marginRight: 20, 
    padding: 5, 
    alignItems: 'center',
    backgroundColor: primaryContainerColor, 
    borderRadius: 7, 
    borderColor: primaryContainerColor
  },
  // Consistant width to have all units afterward line up. 75 should be wide enough for the allowed 6 characters
  ingredientInputAmountStyle: {
    width: 75,
    minWidth: 75, 
    maxWidth: 75, 
    borderWidth:  1, 
    marginTop: 5, 
    marginBottom: 5, 
    marginLeft: 5, 
    marginRight: 10, 
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 5, 
    paddingRight: 5, 
    textAlign: 'center', 
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontFamily: 'Orienta-Regular',
    borderRadius: 10, 
    color: inputTextColor, 
    backgroundColor: inputBackgroundColor
  },
  ingredientInputUnitContainerStyle: {
    backgroundColor: inputBackgroundColor, 
    borderRadius: 10,
    borderColor: inputBackgroundColor,
    marginTop: 10,
    marginBottom: 10
  },
  ingredientInputUnitStyle: {
    height: 40
  },
  // Needs flexGrow to fill remaining space, needs flexShrink to not overflow
  ingredientInputNameStyle: {
    flexGrow: 1, 
    flexShrink: 1, 
    borderWidth:  1,
    marginTop: 5, 
    marginBottom: 5, 
    marginLeft: 10, 
    marginRight: 10, 
    paddingTop: 5,
    paddingBottom: 5, 
    paddingLeft: 5, 
    paddingRight: 5, 
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Orienta-Regular', 
    borderRadius: 10, 
    color: inputTextColor, 
    backgroundColor: inputBackgroundColor
  },
  ingredientDeleteButtonStyle: {
    borderWidth:  1, 
    padding: 5, 
    marginRight: 5,
    backgroundColor: primaryTextColor,
    borderRadius: 5,
  },
  ingredientAddButtonStyle:{
    flexDirection: 'row', 
    flex: 4, 
    borderWidth: 1, 
    marginTop: 5, 
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20, 
    padding: 5, 
    borderRadius: 7,
    backgroundColor: '#FFFFFF'
  },
  ingredientAddButtonTextStyle:{
    color: '#031E33', 
    fontFamily: 'Orienta-Regular', 
    paddingLeft: 10
  },

  // Tag Styles -----------------------------------------------------------------
  tagPanelStyle: {
    flexDirection: 'row', 
    flex: 4, 
    borderWidth:  1, 
    marginTop: 5, 
    marginBottom: 5, 
    marginLeft: 20, 
    marginRight: 20, 
    padding: 5, 
    alignItems: 'center',
    backgroundColor: primaryContainerColor, 
    borderRadius: 7, 
    borderColor: primaryContainerColor
  },
  tagInputNameStyle: {
    flexGrow: 1, 
    flexShrink: 1, 
    borderWidth:  1,
    marginTop: 5, 
    marginBottom: 5, 
    marginLeft: 10, 
    marginRight: 10, 
    paddingTop: 7,
    paddingBottom: 5, 
    paddingLeft: 5, 
    paddingRight: 5, 
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Orienta-Regular', 
    borderRadius: 10, 
    color: inputTextColor, 
    backgroundColor: inputBackgroundColor
  },
  tagDeleteButtonStyle: {
    borderWidth:  1, 
    padding: 5, 
    marginRight: 5,
    backgroundColor: primaryTextColor,
    borderRadius: 5,
  },
  tagAddButtonStyle:{
    flexDirection: 'row', 
    flex: 4, 
    borderWidth: 1, 
    marginTop: 5, 
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20, 
    padding: 5, 
    borderRadius: 7,
    backgroundColor: '#FFFFFF'
  },
  tagAddButtonTextStyle:{
    color: '#031E33', 
    fontFamily: 'Orienta-Regular', 
    paddingLeft: 10
  },

  // Instruction Style ----------------------------------------------------------------------------------------
  instructionInputStyle:{
    borderWidth:  1, 
    marginTop: 5, 
    marginBottom: 30, 
    marginLeft: 20, 
    marginRight: 20, 
    padding: 10, 
    textAlign: 'left', 
    borderRadius: 7, 
    backgroundColor: inputBackgroundColor, 
    fontFamily: 'Orienta-Regular', 
    color: inputTextColor, 
    paddingTop: 10
  },

  // Header Style --------------------------------------------------------------------------------------------
  sectionHeaderStyle: {
    fontFamily: 'Ovo-Regular',
    fontSize: 20,
    color: primaryTextColor,
    textAlign: 'left',
    paddingLeft: 30,
    paddingTop: 20 
  },

  // Delete Buttons Style ----------------------------------------------------------------------------------
  parentDeleteStyle: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    // backgroundColor: primaryBackgroundColor,
    backgroundColor: primaryTextColor,
    margin: 20,
    borderRadius: 3
  },
  buttonDeleteStyle: {
    textDecorationColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 7,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: primaryBackgroundColor,
  },
});
export {editStyles}
