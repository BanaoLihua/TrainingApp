import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
//import { saveData } from './store';
import { useNavigation } from '@react-navigation/native';
//import { Button, TextInput } from 'react-native-paper';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export const addNewScreen = () => {

    const [text, setText] = useState('');

    const [weight, setWeight] = useState();

    const [oldData, setOldData] = useState({
        items: {}
    });

    const [weightData, setWeightData] = useState({});

    const [partsData, setPartsData] = useState({})

    // 部位選択
    const [selectedItems, setSelectedItems] = useState({ 
        shoulder: [false, 'circle'], 
        arm: [false, 'circle'], 
        chest: [false, 'circle'], 
        stomach: [false, 'circle'], 
        back: [false, 'circle']
    });
    //

    const loadData = () => {
        storage.load({key: 'item'})
        .then(res => {setOldData(res)})
        .catch(err => {console.warn(err)});
        storage.load({key: 'weight'})
        .then(res => {setWeightData(res)})
        .catch(err => {console.warn(err)});
        storage.load({key: 'part'})
        .then(res => {setPartsData(res)})
        .catch(err => {console.warn(err)});
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
        weightData[keyName] = weight;
        partsData[keyName] = selectedItemsConverter();

        storage.save({
            key: 'item',
            data: oldData
        });
        storage.save({
            key: 'weight',
            data: weightData
        })
        storage.save({
            key: 'part',
            data: partsData
        })
    }

    // selectedItemsを整形する処理
    const selectedItemsConverter = () => {
        const newPartsData = { dots: [] };
        for(const selectedItem in selectedItems) {
            if(selectedItems[selectedItem][0]) {
                newPartsData.dots.push(selectedItem);
            }
        }
        return newPartsData;
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });
        return unsubscribe;
    }, [navigation]);

    // 部位選択
    // Todo: case文の中の三項方程式の正負が逆な件
    const selectPart = (part) => {
        switch(part) {
            case 'shoulder':
                setSelectedItems({ 
                    ...selectedItems, 
                    shoulder: [!selectedItems.shoulder[0], 
                                selectedItems.shoulder[0] 
                                ? selectedItems.shoulder[1] 
                                = 'circle' 
                                : selectedItems.shoulder[1] 
                                = 'check-circle'
                              ] 
                });
                break;
            case 'arm':
                setSelectedItems({ 
                    ...selectedItems, 
                    arm: [!selectedItems.arm[0], 
                                selectedItems.arm[0] 
                                ? selectedItems.arm[1] 
                                = 'circle' 
                                : selectedItems.arm[1] 
                                = 'check-circle'
                         ] 
                });
                break;
            case 'chest':
                setSelectedItems({ 
                    ...selectedItems, 
                    chest: [!selectedItems.chest[0], 
                                selectedItems.chest[0] 
                                ? selectedItems.chest[1] 
                                = 'circle' 
                                : selectedItems.chest[1] 
                                = 'check-circle'
                           ] 
                });
                break;
            case 'stomach':
                setSelectedItems({ 
                    ...selectedItems, 
                    stomach: [!selectedItems.stomach[0], 
                                selectedItems.stomach[0] 
                                ? selectedItems.stomach[1] 
                                = 'circle' 
                                : selectedItems.stomach[1] 
                                = 'check-circle'
                             ] 
                });
                break;
            case 'back':
                setSelectedItems({ 
                    ...selectedItems, 
                    back: [!selectedItems.back[0], 
                                selectedItems.back[0] 
                                ? selectedItems.back[1] 
                                = 'circle' 
                                : selectedItems.back[1] 
                                = 'check-circle'
                          ] 
                });
                break;
        }
        
    }

    const onPressTest = () => {
        selectedItemsConverter();
    }

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <Header 
                centerComponent={{ text: '今日の成果', 
                                　　style: { color: '#fff', fontSize: 20 } 
                                }}
                rightComponent={{ icon: 'home', 
                                　color: '#fff' 
                            　　}}
            />
            <Input value={text}
                   label="Title"
                   onChangeText={text => setText(text)}
            />
            <Input
                value={weight}
                label="Weight"
                keyboardType="numeric"
                onChangeText={weight => setWeight(weight)}
            />
            <View style={styles.partsSelection}>
                
                <Icon name={selectedItems.shoulder[1]} 
                    　size={30} 
                    　color="tomato" 
                    　onPress={() => selectPart('shoulder')} />
                <Text h3>肩</Text>
                <Icon name={selectedItems.arm[1]} 
                    　size={30} 
                    　color="orange" 
                    　onPress={() => selectPart('arm')} 
                    　style={{marginLeft: 15}} />
                <Text h3>腕</Text>
                <Icon name={selectedItems.chest[1]} 
                    　size={30} 
                    　color="lightgreen" 
                    　onPress={() => selectPart('chest')} 
                    　style={{marginLeft: 15}} />
                <Text h3>胸</Text>
                <Icon name={selectedItems.stomach[1]} 
                    　size={30} 
                    　color="lightskyblue" 
                    　onPress={() => selectPart('stomach')} 
                    　style={{marginLeft: 15}} />
                <Text h3>腹</Text>
                <Icon name={selectedItems.back[1]} 
                    　size={30} 
                    　color="plum" 
                    　onPress={() => selectPart('back')} 
                    　style={{marginLeft: 15}} />
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

const styles = StyleSheet.create({
    partsSelection: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: 10
    }
})