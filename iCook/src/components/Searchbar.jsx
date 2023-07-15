import * as React from "react";
import { SearchBar, Icon, Button } from "@rneui/base";
import { Text, View } from 'react-native'

const SearchBarHeight = 40
const SearchBarWidth = '90%'

/* The Custom SearchBar component takes 1 function: 'onInputChange', which must have one parameter, taking the new input  */
export const CustomSearchBar = ({ onInputChange }) => {
  const [input, setInput] = React.useState("");

  /* handleInputChange handles the local change of input state, and executes the given 'onInputChange' function if applicable */
  const handleInputChange = (givenInput) => {
    setInput(givenInput)
    if(onInputChange) {
      onInputChange(givenInput);
    }
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: SearchBarHeight}}>
      <SearchBar
        platform="default"
        containerStyle={{height: SearchBarHeight, width: SearchBarWidth, padding: 0, backgroundColor: 'rgba(0, 0, 0, 0)', borderTopWidth: 0, borderBottomWidth: 0}}
        inputContainerStyle={{height: SearchBarHeight, width: '100%'}}
        round={true}
        searchIcon={{}}
        loadingProps={{}}
        onChangeText={newInput => handleInputChange(newInput)}
        onClearText={{}}
        placeholder="Type query here..."
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        value={input}
      />
      
  </View>
  );
}

// <View style={{height:50, width:50, backgroundColor: 'green'}}></View>