import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { loadFonts } from '../styleSheets/globalStyle';
import { shareStyle } from '../styleSheets/shareStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export default function ShareScreen() {
  // Initialize the database instance using useMemo to ensure it's created only once
  const db = useMemo(() => SQLite.openDatabase('recipe.db'), []);
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);

  const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'SQLite/recipe.db',
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'recipe.db', 'application/octet-stream')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
        })
        .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/recipe.db');
    }
  }

  const importDb = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true
    });
  
    if (result.type === 'success') {
      setIsLoading(true);
  
      if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
      }
  
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64
      });
  
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/recipe.db', base64, {
        encoding: FileSystem.EncodingType.Base64
      });
  
      // Close the database before reopening
      await db.closeAsync();
  
      // Reopen the database after importing data
      const newDb = SQLite.openDatabase('recipe.db');

      // Now fetch recipes from the new database instance
      newDb.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Recipes',
          null,
          (_, resultSet) => setRecipe(resultSet.rows._array),
          (txObj, error) => console.log('Error fetching data:', error)
        );
      });

      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Create the "Recipes" table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ingredients TEXT, instructions TEXT, image BLOB, tags TEXT);'
      );
    });

    // Fetch recipes from the database and update the state
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Recipes',
        null,
        (_, resultSet) => setRecipe(resultSet.rows._array),
        (txObj, error) => console.log('Error fetching data:', error)
      );
    });

    setIsLoading(false);
  }, [db]);

  return (
    <SafeAreaView style={shareStyle.shareScreen}>
      <View style={shareStyle.shareTitle}>
        <Text style={shareStyle.shareText}>Share To Other Devices Or User</Text>

        <View style={shareStyle.shareButtonContainer}>
          <TouchableOpacity onPress={exportDb}>
            <Text style={shareStyle.shareButton}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={importDb}>
            <Text style={shareStyle.shareButton}>Import</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
