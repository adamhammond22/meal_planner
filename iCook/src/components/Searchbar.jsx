/* Searchbar.jsx defines and exports the CustomSearchBar component */
import * as React from "react";
import { SearchBar, Icon } from "@rneui/base";
import { Text, View, TouchableOpacity  } from 'react-native';

import { searchStyles} from "../styleSheets/searchStyle";

const SearchBarHeight = 40
const SearchBarWidth = '90%'


/* Small Helper function that returns True if the input is all whitespace text */
function isNotWhitespace(input) {
  return /^\S+$/.test(input.trim());
}


/* The Custom SearchBar component takes 1 function: 'onInputChange', which must take one parameter: an array of search inputs, the lastmost element is the one in the searchbar */
export const CustomSearchBar = ({ onInputChange }) => {

  // ========== States and References ========== //

  /* input state tracks the current text in the search bar, and it used to refresh the component */
  const [input, setInput] = React.useState("");
  /* the currentSearches state is used to persist our current searches when refreshing, not used to refresh the component*/
  const [currentSearches, setCurrentSearches] = React.useState([]);

  /* Reference to search bar so we can call it's native methods */
  this.search = React.createRef();


  // ========== Input Handling Functions ========== //

  /* handleInputChange handles the local changes of input and currentSearches state, and executes the given 'onInputChange' function if applicable */
  /* Note: onInputChange is given the "trimmed" input, removing leading and trailing whitespace from the actual search */
  const handleInputChange = (givenInput) => {

    /* If we're given a parent onInputChange function, use it */
    if(onInputChange) {
      // get a copy of our array of current searches and push our newest search to it
      searchesArray = [...currentSearches]
      // only push the given input if it's not whitespace
      if(givenInput.trim() != "") {
        searchesArray.push(givenInput.trim())
      }
      // pass the copy into the parent's 'onInputChange' function
      onInputChange(searchesArray);
    }
  }

  /* Whenever input or currentSearches lists are changed, we must call handleInputChange to update our parent's state */
  React.useEffect(() => {
    if(handleInputChange) {
      handleInputChange(input)
    }
  }, [currentSearches, input]);

  /* Function handling when "return" is hit- submitting a search */
  /* Note: we "trim" the input when adding it to the array as well- trailing and leading whitespace is not saved */
  const handleSubmit = () => {
    // ensure the current input isn't whitespace
    if(isNotWhitespace(input)){
      // create a copied array, push the new element, and update the state to that array
      let newSearches = [...currentSearches]
      newSearches.push(input.trim())
      setCurrentSearches(newSearches)
    }
    //clear the searchbar, as we've "submitted" our search, and it will be shown elsewhere
    this.search.clear();
    setInput("")
  }

  /* Function removing a single search by it's name in the currentSearches state array */
  const removeSearch = (stringToRemove) => {
    // create a copied array, and search for the index of the string to remove
    let newSearches = [...currentSearches]
    let index = newSearches.indexOf(stringToRemove);

    // if found, remove that index and update the state
    if (index !== -1) {
      newSearches.splice(index, 1);
      setCurrentSearches(newSearches)
    }
  }

  /* Function cancelling all current searches */
  const cancelSearch = () => {
    // clear our current searches
    setCurrentSearches([])
  }


  // ========== Rendering Functions & Return  ========== //

  /* Function that renders the cancel button on the condition that previous searches exist*/
  const conditionallyRenderCancelButton = () => {
    if (currentSearches.length <= 0) {
      return
    } else{
      return(
        <View  style={searchStyles.previousSearchCancelContainerStyle}>
          <TouchableOpacity onPress={() => cancelSearch()}>
            <Icon  iconStyle ={searchStyles.previousSearchIconStyle} name= 'cancel'/>
        </TouchableOpacity>
        </View>
      )
    }
  }

  /* Function that renders all of the previous searches as buttons */
  const renderCurrentSearches = () => {
    return currentSearches.map((item, index) => (
    <View style={searchStyles.previousSearchIndividualContainerStyle} key={index}>
    
      <Text style={searchStyles.previousSearchTextStyle}>{item}</Text>
      {/* <Button title="Delete" onPress={() => deleteRecipe(item.id)} /> */}
      <TouchableOpacity onPress={() => removeSearch(item)}>
        <Icon iconStyle ={searchStyles.previousSearchIconStyle} name= 'delete' />
      </TouchableOpacity>

    </View >         
    ));
  };


  return (
    <View style={ searchStyles.searchContainerStyle}>
      {/* Imported searchbar */}
      <SearchBar
        platform="default"
        containerStyle={searchStyles.searchbarContainerStyle}
        inputContainerStyle={searchStyles.searchInputContainerStyle}
        inputStyle={searchStyles.inputStyle}
        placeholderTextColor='#AFB8BA'
        round={true}
        onChangeText={newInput => setInput(newInput)}
        ref={search => this.search = search}
        placeholder="Type Search Here ..."
        clearButtonTitle="Clear"
        onSubmitEditing ={() => handleSubmit()}
        value={input}
      />
      {/* Render our previous searches and the cancel button */}
      <View style={searchStyles.previousSearchContainerStyle} >
        {renderCurrentSearches()}
        {conditionallyRenderCancelButton()}
      </View>
  </View>
  );
}
