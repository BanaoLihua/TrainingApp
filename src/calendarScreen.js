import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


// https://github.com/wix/react-native-calendars/issues/335
export const calendarScreen = () => {
    
    const navigation = useNavigation();

    // アジェンダ内容のJSXを返す関数
    const renderItem = (item) => {
        return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity>
                <Text style={{color: 'black', fontSize: 20}}>{item.name}</Text>
                <Text style={{color: '#555'}}>体重：{item.weight}kg</Text>  
                <Text style={{color: '#555'}}>部位：{item.parts}</Text>  
            </TouchableOpacity>
        </View>
        );
      } 
    
    const storage = new Storage({
        storageBackend: AsyncStorage
    })
    const [items, setItems] = useState();
    const [markedDates, setMarkedDates] = useState();

    // calendar画面を表示したときにデータをロードする処理
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            storage
            .load({key: 'item'})
            .then(res => {
                setItems(res.items)
            })
            .catch(err => console.warn(err));
            storage
            .load({key: 'part'})
            .then(res => {
                setMarkedDates(res);
            })
            .catch(err => console.warn(err));
        });
        return unsubscribe;
    }, [items]);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar />
            <Agenda
                items={items}
                renderItem={(item) => { return (renderItem(item))}}
                renderEmptyDate={() => {return (<View />);}}
                markedDates={markedDates}
                markingType={'multi-dot'}
            />
        </View>
    );
}