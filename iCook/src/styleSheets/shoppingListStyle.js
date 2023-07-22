import { StyleSheet } from 'react-native'
import { primaryTextColor, primaryContainerColor } from './globalStyle';

const inputTextColor = '#545252'
const inputBackgroundColor = '#D9D9D9'

const shoppingListStyles = StyleSheet.create({
  listTitleStyle: {
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Tangerine-Regular',
    fontSize: 64,
    color: primaryTextColor,
    textAlign: 'center'
  },
  checkBox: {
    color: inputTextColor,
    uncheckedColor: inputBackgroundColor
  },
  checkBoxContainerStyle: {
    borderColor: '#00000',
    borderRadius: 7,
    backgroundColor: inputBackgroundColor
  },
  // item Styles -----------------------------------------------------------------
  itemPanelStyle: {
    flexDirection: 'row', 
    flex: 4, 
    borderWidth:  1, 
    marginTop: 1, 
    marginBottom: 1, 
    marginLeft: 20, 
    marginRight: 20, 
    padding: 5, 
    alignItems: 'center',
    backgroundColor: primaryContainerColor, 
    borderRadius: 7, 
    borderColor: primaryContainerColor
  },
  itemInputNameStyle: {
    flexGrow: 1, 
    flexShrink: 1, 
    borderWidth:  1,
    marginTop: 1, 
    marginBottom: 1, 
    marginLeft: 10, 
    marginRight: 10, 
    paddingTop: 5,
    paddingBottom: 7, 
    paddingLeft: 5, 
    paddingRight: 5, 
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: 'Orienta-Regular', 
    fontSize: 18,
    borderRadius: 10, 
    color: inputTextColor, 
    backgroundColor: inputBackgroundColor
  },
  itemDeleteButtonStyle: {
    borderWidth:  1, 
    padding: 5, 
    marginRight: 5,
    backgroundColor: primaryTextColor,
    borderRadius: 5,
  },
  itemAddButtonStyle:{
    flex: 1, 
    borderWidth: 1, 
    marginTop: 5, 
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20, 
    padding: 5, 
    borderRadius: 7,
    backgroundColor: inputBackgroundColor,
    textAlign: 'center'
  },
  itemAddButtonTextStyle:{
    color: '#031E33', 
    fontFamily: 'Orienta-Regular', 
    textAlign: 'center',
    fontSize: 18
  },
})

export {shoppingListStyles}