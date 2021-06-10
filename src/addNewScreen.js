import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
//import { saveData } from './store';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addNewScreen = () => {

    const [text, setText] = useState('');
    const [today, setToday] = useState('');

    //
    const store = {
        key: 'item',
        data: {
            items: {}
        }
    };
    const [oldData, setOldData] = useState({
        key: 'item',
        data: {
            items: {}
        }
    });
    const loadData = () => {
        storage.load({key: 'item'})
        .then(res => {setOldData(res)})
        .catch(err => {console.warn(err)})
    }

    //

    const storage = new Storage({
        storageBackend: AsyncStorage
    })


    const getNowYMD = () => {
        const dt = new Date();
        const y = dt.getFullYear();
        const m = ("00" + (dt.getMonth()+1)).slice(-2);
        const d = ("00" + dt.getDate()).slice(-2);
        return [y, m, d].join('-');
    }

    // オブジェクトのキー名に変数を指定したい
    const onPressSave = () => {
        const keyName = getNowYMD();
        const keyName2 = '2021-06-09';
        store.data.items[keyName] = [{name: text}];
        oldData.items[keyName2] = [{name: text}];
        console.log(store.data.items);
        console.log(oldData.items);
        storage.save({
            key: 'item',
            data: oldData
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });
        return unsubscribe;
    }, [navigation]);

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput value={text}
                       mode='outlined'
                       onChangeText={text => setText(text)}
                       style={{ margin: 30 }} />
            <Button mode="contained"
                    color="dodgerblue"
                    style={{ margin: 30 }}
                    onPress={ onPressSave }
                    >保存</Button>
        </View>
    );
}