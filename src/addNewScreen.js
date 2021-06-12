import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
//import { saveData } from './store';
import { useNavigation } from '@react-navigation/native';
//import { Button, TextInput } from 'react-native-paper';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';


export const addNewScreen = () => {

    const [text, setText] = useState('');

    const [oldData, setOldData] = useState({
        items: {}
    });

    // 部位選択
    const [part, setPart] = useState('');

    const [mode, setMode] = useState('circle');

    const [selectedItems, setSelectedItems] = useState({ shoulder: false, arm: false, chest: false, stomach: false, back: false });

    const [isSelectedShoulder, setIsSelectedShoulder] = useState('circle');

    const [isSelectedArm, setIsSelectedArm] = useState('circle');

    const [isSelectedChest, setIsSelectedChest] = useState('circle');

    const [isSelectedStomach, setIsSelectedStomach] = useState('circle');

    const [isSelectedBack, setIsSelectedBack] = useState('circle');
    //

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

    // 部位選択
    // Todo: case分の中の三項方程式の正負が逆な件
    const selectPart = (part) => {
        switch(part) {
            case 'shoulder':
                setSelectedItems({ ...selectedItems, shoulder: !selectedItems.shoulder });
                //selectedItems.shoulder ? setIsSelectedShoulder('check-circle') : setIsSelectedShoulder('circle');
                selectedItems.shoulder ? setIsSelectedShoulder('circle') : setIsSelectedShoulder('check-circle');
                break;
            case 'arm':
                setSelectedItems({ ...selectedItems, arm: !selectedItems.arm });
                //selectedItems.arm ? setIsSelectedArm('check-circle') : setIsSelectedArm('circle');
                selectedItems.arm ? setIsSelectedArm('circle') : setIsSelectedArm('check-circle');
                break;
            case 'chest':
                setSelectedItems({ ...selectedItems, chest: !selectedItems.chest });
                //selectedItems.chest ? setIsSelectedChest('check-circle') : setIsSelectedChest('circle');
                selectedItems.chest ? setIsSelectedChest('circle') : setIsSelectedChest('check-circle');
                break;
            case 'stomach':
                setSelectedItems({ ...selectedItems, stomach: !selectedItems.stomach });
                //selectedItems.stomach ? setIsSelectedChest('check-circle') : setIsSelectedChest('circle');
                selectedItems.stomach ? setIsSelectedStomach('circle') : setIsSelectedStomach('check-circle');
                break;
            case 'back':
                setSelectedItems({ ...selectedItems, back: !selectedItems.back });
                //selectedItems.back ? setIsSelectedChest('check-circle') : setIsSelectedChest('circle');
                selectedItems.back ? setIsSelectedBack('circle') : setIsSelectedBack('check-circle');
                break;
        }
        
    }

    const onPressTest = () => {
        console.log(selectedItems);
        console.log(isSelectedShoulder)
    }

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
                
                <Icon name={isSelectedShoulder} size={30} color="tomato" onPress={() => selectPart('shoulder')} />
                <Text h3>肩</Text>
                <Icon name={isSelectedArm} size={30} color="orange" onPress={() => selectPart('arm')} style={{marginLeft: 15}} />
                <Text h3>腕</Text>
                <Icon name={isSelectedChest} size={30} color="lightgreen" onPress={() => selectPart('chest')} style={{marginLeft: 15}} />
                <Text h3>胸</Text>
                <Icon name={isSelectedStomach} size={30} color="lightskyblue" onPress={() => selectPart('stomach')} style={{marginLeft: 15}} />
                <Text h3>腹</Text>
                <Icon name={isSelectedBack} size={30} color="plum" onPress={() => selectPart('back')} style={{marginLeft: 15}} />
                <Text h3>背</Text>
                

            </View>
            
            <Button title="テスト"
                    style={{ margin: 30 }}
                    onPress={ onPressTest }
            />
            <Button title="保存"
                    style={{ margin: 30 }}
                    onPress={ onPressSave }
            />
        </View>
    );
}