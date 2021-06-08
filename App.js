import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { calendarScreen } from './src/calendarScreen';
import { addNewScreen } from './src/addNewScreen';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="calendar" component={calendarScreen} />
        <Tab.Screen name="addNew" component={addNewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
