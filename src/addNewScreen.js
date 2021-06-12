import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
//import { saveData } from './store';
import { useNavigation } from '@react-navigation/native';
//import { Button, TextInput } from 'react-native-paper';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export const addNewScreen = () => {

    const [text, setText] = useState('');

    const [oldData, setOldData] = useState({
        items: {}
    });

    const [part, setPart] = useState('');

    const loadData = () => {
        storage.load({key: 'item'})
        .then(res => {setOldData(res)})
        .catch(err => {console.warn(err)})
    }

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

    // 保存処理
    const onPressSave = () => {
        console.log(part);
        const keyName = getNowYMD();
        oldData.items[keyName] = [{name: text}];
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
        <View style={{ flex: 1 }}>
            <Header 
                centerComponent={{ text: '今日の成果', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <Input value={text}
                   label="Title"
                   onChangeText={text => setText(text)}
            />
            <Input
                value="50"
                label="Weight"
                keyboardType="numeric"
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10}}>
                
                <Icon name="circle" size={30} color="tomato" onPress={() => setPart('shoulder')} />
                <Text h3>肩</Text>
                <Icon name="circle" size={30} color="orange" onPress={() => setPart('arm')} style={{marginLeft: 15}} />
                <Text h3>腕</Text>
                <Icon name="circle" size={30} color="lightgreen" onPress={() => setPart('chest')} style={{marginLeft: 15}} />
                <Text h3>胸</Text>
                <Icon name="circle" size={30} color="lightblue" onPress={() => setPart('stomach')} style={{marginLeft: 15}} />
                <Text h3>腹</Text>
                <Icon name="circle" size={30} color="plum" onPress={() => setPart('back')} style={{marginLeft: 15}} />
                <Text h3>背</Text>
                

            </View>
            <Button title="保存"
                    style={{ margin: 30 }}
                    onPress={ onPressSave }
                    >保存</Button>
        </View>
    );
}