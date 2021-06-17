import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { calendarScreen } from './src/calendarScreen';
import { addNewScreen } from './src/addNewScreen';
import { graphScreen } from './src/graphScreen'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              let iconName;
              let color;
              switch(route.name) {
                case 'トレーニング記録': {
                  iconName = 'calendar';
                  color = focused ? 'dodgerblue' : 'gray';
                } break;
                case '今日の成果': {
                  iconName = 'plus-circle';
                  color = focused ? 'dodgerblue' : 'gray';
                } break;
                case 'グラフ': {
                  iconName = 'line-chart';
                  color = focused ? 'dodgerblue' : 'gray';
                } break;
              }
              return <Icon name={iconName} size={30} color={color} />
            }
        })}>
            <Tab.Screen name="トレーニング記録" component={calendarScreen} />
            <Tab.Screen name="今日の成果" component={addNewScreen} />
            <Tab.Screen name="グラフ"　component={graphScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
