import { StyleSheet } from 'react-native'
import {primaryBackgroundColor, primaryTextColor, primaryContainerColor} from '../styleSheets/globalStyle'

const homeStyles = StyleSheet.create({
  home: {
    flex:1,
    backgroundColor: primaryBackgroundColor
  },
  recipeWrapper: {
    display:'flex',
    backgroundColor: primaryContainerColor,
    borderRadius: 7,
    marginBottom: 5,
    marginLeft:10,
    marginRight:10,
    marginTop: 5,
    flexDirection: 'column',
    justifyContent:"center"
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
  descripText:{
    fontFamily: 'Orienta-Regular',
    alignSelf: 'flex-start',
    color: '#AFB8BA',
    fontWeight: '400',
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 12
  },
  recipeButton:{
    fontFamily: 'Orienta-Regular',
    color: primaryTextColor,
    fontSize: 15,
    flexDirection:'row',
    alignItems:'flex-end',
    // alignContent:"center",
    fontWeight: '400',
    alignSelf:'flex-end', 
    justifyContent:'center',
    padding:10
  },
  button:{
    fontFamily: 'Orienta-Regular',
    color: primaryTextColor,
    fontSize: 15,
    alignContent:"center",
    justifyContent:"center",
    marginTop: 10,
    marginBottom: -38,
    fontWeight: 'bold'
  },
  title: {
    fontFamily: 'Tangerine-Regular',
    color: primaryTextColor,
    fontSize: 64,
    textAlign: 'center',
    // textDecorationLine:'underline',
    // textTransform: 'uppercase',
    marginBottom: 15,
  },
  description:{
    fontFamily: 'Orienta-Regular',
    color: primaryTextColor,
    textAlign:"left"
  },
  images:{
    height:110,
    width:100,
    flexWrap:"wrap",
    flexDirection:"column",
    justifyContent:"center",
    resizeMode: 'contain',
    marginTop: 10,
    borderRadius: 12
  },
  seperator:{
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchBarInputStyle: {
    backgroundColor: '#D9D9D9'
  },
  searchBarBufferStyle: {
    paddingBottom: 10
  },
  recipeButtonRowStyle:{
    flexDirection:'row', 
    margin: 10, 
    justifyContent:'center'
  },
  newRecipeButtonAdditionsStyle: {
    textAlign:'center', 
    paddingBottom: 15,
    marginBottom: 50
  },

  debugDeleteStyle: {
    color:'red', 
    textAlign:'center', 
    fontSize:20,
    marginTop: 10,
    marginBottom: 5
  },
  debugAddStyle: {
    color:'orange', 
    textAlign:'center', 
    fontSize:20,
    marginBottom: 5
  },
  debugEndLineStyle:{
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  }
});
export {homeStyles}