import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';


export const calendarScreen = () => {
    
    const renderItem = (item, firstItemInDay) => {
        console.log('rendering', item)
        return (
          <TouchableOpacity>
            <>
            <Text style={{color: 'black'}}></Text>
            <Text style={{color: '#555'}}>{item.name}</Text>
          </>
          </TouchableOpacity>
        );
      } 

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar />
            <Agenda
                items={{
                    '2021-05-22': [{name: 'aiueo',start: '2021-05-22T13:45:00',end: '2021-05-22T20:45:00'},{name: 'item 1 - any js object'},],
                    '2021-05-23': [{name: 'item 2 - any js object', height: 80}],
                    '2021-05-24': [],
                    '2021-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
                  }}
                renderItem={(item, firstItemInDay) => { return (renderItem(item, firstItemInDay))}}
            />

        </View>
    );
}