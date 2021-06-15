import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


// https://github.com/wix/react-native-calendars/issues/335
export const calendarScreen = () => {
    
    const navigation = useNavigation();

    // アジェンダ内容のJSXを返す関数
    const renderItem = (item, firstItemInDay) => {
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
    
    // 日の印(テスト)
    const type1 = {key:'type1', color: 'blue'};
    const type2 = {key:'type2', color: 'green'};
    const type3 = {key:'type3', color: 'yellow'};
    const type4 = {key:'type4', color: 'red'};

    // テストデータ
    const items2 = {
        '2021-05-22': [{name: 'aiueo',start: '2021-05-22T13:45:00',end: '2021-05-22T20:45:00'},{name: 'item 1 - any js object'},],
        '2021-05-23': [{name: 'item 2 - any js object', height: 80}],
        '2021-05-24': [{name: 'にじゅうよん'}],
        '2021-05-25': [{name: 'i'}, {name: 'any js object'}]
    }
    const markedDates2 = {
        '2021-05-16': {dots: [type1, type2, type3, type4]},
        '2021-05-17': {dots: [type1, type4], marked: true},
        '2021-05-18': {disabled: true}
    }
    const markedDates3 = {
        '2021-05-20': {textColor: 'green'},
        '2021-05-21': {startingDay: true, endingDay: true, color: 'lightgreen'},
        '2021-05-22': {startingDay: true, endingDay: true, color: 'lightgreen'},
        '2021-05-23': {startingDay: true, endingDay: true, color: 'lightgreen'},
        '2021-05-24': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
        '2021-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
    }

    //
    const storage = new Storage({
        storageBackend: AsyncStorage
    })
    const [items, setItems] = useState();
    const [weight, setWeight] = useState();
    const [markedDates, setMarkedDates] = useState();

    // calendar画面を表示したときにデータをロードする処理
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            storage
            .load({key: 'item'})
            .then(res => {
                setItems(res.items)
            })
            .catch(err => console.warn(err))
            storage
            .load({key: 'weight'})
            .then(res => {
                setWeight(res)
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
                renderItem={(item, firstItemInDay) => { return (renderItem(item, firstItemInDay))}}
                renderEmptyDate={() => {return (<View />);}}
                markedDates={markedDates}
                markingType={'multi-dot'}
            />
        </View>
    );
}