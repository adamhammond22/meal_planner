/* Searchbar.jsx defines and exports the CustomSearchBar component */
import * as React from "react";
import { SearchBar, Icon, Button } from "@rneui/base";
import { Text, View, TouchableOpacity, FlatList  } from 'react-native'

const SearchBarHeight = 40
const SearchBarWidth = '90%'

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
        <View  style={{flexDirection: 'row', borderRadius:10, margin:2, padding:4,
        marginHorizontal:1, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => cancelSearch()}>
            <Icon name= 'cancel'/>
        </TouchableOpacity>
        </View>
      )
    }
  }

  /* Function that renders all of the previous searches as buttons */
  const renderCurrentSearches = () => {
    return currentSearches.map((item, index) => (
    <View style={{borderWidth: 3, borderColor: '#293137', flexDirection: 'row', borderRadius:10, margin:2, padding:4,
      marginHorizontal:1, alignItems: 'center'}} key={index}>
    
      <Text style={{fontSize: 18, flexWrap: 'wrap', maxWidth: SearchBarWidth}}>{item}</Text>
      {/* <Button title="Delete" onPress={() => deleteRecipe(item.id)} /> */}
      <TouchableOpacity onPress={() => removeSearch(item)}>
        <Icon name= 'delete' />
      </TouchableOpacity>

    </View >         
    ));
  };


  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
      {/* Imported searchbar */}
      <SearchBar
        platform="default"
        containerStyle={{height: SearchBarHeight, width: SearchBarWidth, padding: 0, backgroundColor: 'rgba(0, 0, 0, 0)', borderTopWidth: 0, borderBottomWidth: 0}}
        inputContainerStyle={{height: SearchBarHeight, width: '100%'}}
        round={true}
        searchIcon={{}}
        loadingProps={{}}
        onChangeText={newInput => setInput(newInput)}
        onClearText={{}}
        ref={search => this.search = search}
        placeholder="Type Search Here ..."
        placeholderTextColor="#888"
        clearButtonTitle="Clear"
        onSubmitEditing ={() => handleSubmit()}
        cancelButtonProps={{}}
        value={input}
      />
      {/* Render our previous searches and the cancel button */}
      <View style={{maxWidth: SearchBarWidth, flexWrap:'wrap', flexDirection: 'row', justifyContent:'center'}} >
        {renderCurrentSearches()}
        {conditionallyRenderCancelButton()}
      </View>
  </View>
  );
}
