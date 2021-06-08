import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const storage = new Storage({
    storageBackend: AsyncStorage,
  })

  const testSave = () => {
    storage.save({
      key: 'test',
      data: {
        text: 'banao'
      }
    })
  }

  const testLoad = () => {
    storage.load({
      key: 'test',
    })
    .then(ret => {
      console.log(ret.text);
    })
    .catch(err => {
      console.warn(err.message)
    })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="save" onPress={testSave} />
      <Button title="load" onPress={testLoad} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
