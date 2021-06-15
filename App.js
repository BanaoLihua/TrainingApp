import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { calendarScreen } from './src/calendarScreen';
import { addNewScreen } from './src/addNewScreen';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          let color;
          if(route.name === 'calendar') {
            iconName = 'calendar';
            color = focused ? 'dodgerblue' : 'gray';
          }else if(route.name === 'addNew') {
            iconName = 'plus-circle';
            color = focused ? 'dodgerblue' : 'gray';
          }
          return <Icon name={iconName} size={30} color={color} />
        }
      })}>
        <Tab.Screen name="calendar" component={calendarScreen} />
        <Tab.Screen name="addNew" component={addNewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
