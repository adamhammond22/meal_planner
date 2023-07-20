import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';


/* Import SQLite functions */
import * as SQLite from 'expo-sqlite';

/* Init SQLite database obj */
const shoppingdb = SQLite.openDatabase('shoppingList.db');

export default function ShoppingListScreen() {

  /* ========== States and Effects ========== */
  useEffect(() => {
    CreateShoppingListTable()
  }, []);

  /* isLoading is true if we're currently loading our list of shopping items */
  const [isLoading, setIsLoading] = useState(true);
  const [listCount, setListCount] = useState(0)

  /* shoppingList is the state containing the list of items on the shopping list */
  const [shoppingList, setShoppingList] = useState([]);


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
      console.log('Added to list, id: ' + newItemId)
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
    setTagArray(tempArray)
    // Update Tag Count
    setTagsCount(tagsCount - 1)
    DeleteItemFromDataBase(removeId);
  }

  /* This function removes the item corisponding to the itemId from the database */
  const DeleteItemFromDataBase = (itemId) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM ShoppingList where id = ?;`, [itemId]);
      },
      null,
      null
    );
  };

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
  

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Shopping List Screen</Text>
        <TouchableOpacity 
        onPress={() => AddItem()}>
          <Text>ADD Item</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


