import React, { useState, useEffect } from 'react'
import InputScrollView from 'react-native-input-scroll-view'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { shoppingListStyles } from '../styleSheets/shoppingListStyle';
import { globalStyles, loadFonts } from '../styleSheets/globalStyle';


/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';

/* Init SQLite database obj */
const shoppingdb = SQLite.openDatabase('shoppingList.db');

export default function ShoppingListScreen() {

  /* ========== States and Effects ========== */
  useEffect(() => {
    CreateShoppingListTable()
  }, []);

  loadFonts

  /* isLoading is true if we're currently loading our list of shopping items */
  const [isLoading, setIsLoading] = useState(true);
  const [listCount, setListCount] = useState(0)

  /* shoppingList is the state containing the list of items on the shopping list */
  const [shoppingList, setShoppingList] = useState([]);
  const [checkState, setCheckState] = useState(false);

  /* Creates a table to store our shopping items in. Each item contains id: text: (string) and checked: (Int of 1 or 0 which can be
  assigned through true/false) */
  const CreateShoppingListTable = () =>{
    shoppingdb.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ShoppingList (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, checked INTEGER);',
        [],
        () => LoadShoppingList()
      );
    });
  }

  /* SQLLite Function that loads all items from database into the shoppingList state.
  Updates setsIsLoading state to false when completed */
  const LoadShoppingList = () => {
    shoppingdb.transaction(tx => {
      tx.executeSql('SELECT * FROM ShoppingList', [],
        (_, results) => {
          let shoppingItemArray = [];
          for (let i = 0; i < results.rows.length; ++i){
            ingredient = results.rows.item(i)
            shoppingItemArray.push({id: ingredient.id, text: ingredient.text, checked: ingredient.checked});
          }
          /* When the callback is completed, update our 2 states */
          setShoppingList(shoppingItemArray)
          setListCount(shoppingItemArray.length)
          setIsLoading(false);
        });
        (_, error) => console.log("ShoppingListScreen.jsx: loadShoppingList() error: ", error) // Error callback
    });
  };

  /* This function adds a new empty and unchecked item to shoppingList and also calls AddItemToDataBase to add it there as well */
  const AddItem = () => {
    AddItemToDataBase() 
    .then((newItemId) => {
      let tempArray = shoppingList
      tempArray.push({id: newItemId, text: '', checked: false})
      setShoppingList(tempArray)
      setListCount(listCount + 1)
    })
    /* Upon failure, remain on this screen*/
    .catch((error) => {
      console.log('ShoppingListScreen.jsx: Error adding List Item:', error);
    });
  }

  /* This function add a new empty and unchecked item to the database and promices to return the new item's id */
  const AddItemToDataBase = () => {
    return new Promise((resolve, reject) => {
      shoppingdb.transaction(tx => {
        tx.executeSql('INSERT INTO ShoppingList (text, checked) values (?, ?)', ['', false], 
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
        );
      },
      null,
      null
      );
    });
  };

  /* This function removes and item by index from shoppingList and uses the items' id to call DeleteItemFromDataBase to 
  delete it from there as well */
  const RemoveItem = (indexToRemove) => {
    let tempArray = shoppingList
    const removeId = tempArray[indexToRemove].id
    tempArray = tempArray.filter((_, index) => index !== indexToRemove);
    // Update Tag Array
    setShoppingList(tempArray)
    // Update Tag Count
    setListCount(listCount - 1)
    DeleteItemFromDataBase(removeId);
  }

  /* This function removes the item corisponding to the itemId from the database */
  const DeleteItemFromDataBase = (itemId) => {
    shoppingdb.transaction(
      tx => {
        tx.executeSql(`DELETE FROM ShoppingList where id = ?;`, [itemId]);
      },
      null,
      null
    );
  };

  
  const UpdateItemText = (newText, item, index) => {
    let tempArray = shoppingList
    tempArray[index].text = newText
    item.text = newText
    setShoppingList(tempArray)
    UpdateItemInDataBase(item, item.id)
  }

  const SwitchItemChecked = ( item, index) => {
    console.log(shoppingList[index].checked)
    let tempArray = shoppingList
    tempArray[index].checked = !tempArray[index].checked
    item.checked = tempArray[index].checked
    setShoppingList(tempArray)
    UpdateItemInDataBase(item, item.id)
    setCheckState(!checkState)
  }

  /* This function overrideds the existing item at itemID with the new overridingItem's properties (text and checked) */
  const UpdateItemInDataBase = (overridingItem, itemId) => {
    shoppingdb.transaction(
      tx => {
        tx.executeSql(`UPDATE ShoppingList SET text = ? WHERE id = ?;`, 
        [overridingItem.text, itemId]);
      },
      null,
      null,
    );
    shoppingdb.transaction(
      tx => {
        tx.executeSql(`UPDATE ShoppingList SET checked = ? WHERE id = ?;`, 
        [overridingItem.checked, itemId]);
      },
      null,
      null,
    );
  }

  let itemsJSXList = []

  function loadListView() {
    itemsJSXList.length = 0
    shoppingList.forEach((item, index) => {
      itemsJSXList.push(
        <View  key={index} style = {shoppingListStyles.itemPanelStyle}>
          {/* Checkbox */}
          <View style = {shoppingListStyles.checkBoxContainerStyle}>
          <Checkbox
            status = {item.checked ? 'checked' : 'unchecked'}
            onPress={() => SwitchItemChecked(item, index)}
          />
          </View>
          {/* Tag Input */}
          <TextInput
            style={shoppingListStyles.itemInputNameStyle}
            editable
            multiline={true}
            numberOfLines={1}
            blurOnSubmit={true}
            onChangeText={value => UpdateItemText(value, item, index)}
            defaultValue={item.text}
            placeholder='Item Name'
          />
          {/* Delete Tag Button */}
          <TouchableOpacity style = {shoppingListStyles.itemDeleteButtonStyle}
          onPress={() => RemoveItem(index)} >
            <Text style={[globalStyles.buttonTextStyle, {color:'red'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )
    });
    itemsJSXList.push(
      <TouchableOpacity  key={shoppingList.length} style = {shoppingListStyles.itemAddButtonStyle}
      onPress={() => AddItem()}>
        <Text style = {shoppingListStyles.itemAddButtonTextStyle}>Add New Tag</Text>
      </TouchableOpacity>
    );
  }

  loadListView()

  return (
    <SafeAreaView>
      <InputScrollView style={globalStyles.wrapper} keyboardOffset = {120}>
          <Text style = {shoppingListStyles.listTitleStyle}>
            Shopping List
          </Text>
          {itemsJSXList}
        </InputScrollView>
    </SafeAreaView>
  );
}


