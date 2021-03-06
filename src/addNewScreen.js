import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export const addNewScreen = () => {

    const [text, setText] = useState('');

    const [weight, setWeight] = useState();

    const [itemData, setItemData] = useState({
        items: {}
    });

    const [weightData, setWeightData] = useState({});

    const [partsData, setPartsData] = useState({})

    const [selectedItems, setSelectedItems] = useState({ 
        shoulder: [false, 'circle', 'tomato'], 
        arm: [false, 'circle', 'orange'], 
        chest: [false, 'circle', 'lightgreen'], 
        stomach: [false, 'circle', 'lightskyblue'], 
        back: [false, 'circle', 'plum']
    });

    const loadData = () => {
        storage.load({key: 'item'})
        .then(res => {setItemData(res)})
        .catch(err => {console.warn(err)});
        storage.load({key: 'weight'})
        .then(res => {setWeightData(res)})
        .catch(err => {console.warn(err)});
        storage.load({key: 'part'})
        .then(res => {setPartsData(res)})
        .catch(err => {console.warn(err)});
    }

    const storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    });

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
        itemData.items[keyName] = [{name: text, weight: weight, parts: selectedItemsTranslater()}];
        weightData[keyName] = weight;
        partsData[keyName] = selectedItemsConverter();

        storage.save({
            key: 'item',
            data: itemData
        });
        storage.save({
            key: 'weight',
            data: weightData
        });
        storage.save({
            key: 'part',
            data: partsData
        });

        // 画面遷移時に値の初期化とアラート
        setText('');
        setWeight();
        setSelectedItems({ 
            shoulder: [false, 'circle', 'tomato'], 
            arm: [false, 'circle', 'orange'], 
            chest: [false, 'circle', 'lightgreen'], 
            stomach: [false, 'circle', 'lightskyblue'], 
            back: [false, 'circle', 'plum']
        })
        Alert.alert('trainingApp', '今日の成果を記録しました！')
        navigation.navigate('トレーニング記録');
    }

    // selectedItemsを整形する処理
    const selectedItemsConverter = () => {
        const newPartsData = { dots: [] };
        for(const selectedItem in selectedItems) {
            if(selectedItems[selectedItem][0]) {
                newPartsData.dots.push({color: selectedItems[selectedItem][2], key: selectedItem});
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
                                = 'check-circle',
                                selectedItems.shoulder[2]
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
                                = 'check-circle',
                                selectedItems.arm[2]
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
                                = 'check-circle',
                                selectedItems.chest[2]
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
                                = 'check-circle',
                                selectedItems.stomach[2]
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
                                = 'check-circle',
                                selectedItems.back[2]
                          ] 
                });
                break;
        }
    }

    // 選択した部位を漢字に直す関数
    const selectedItemsTranslater = () => {
        const selectedItemsJapanese = [];
        for(const selectedItem in selectedItems) {
            if(selectedItems[selectedItem][0]) {
                switch(selectedItem) {
                    case 'shoulder': selectedItemsJapanese.push('肩');break;
                    case 'arm': selectedItemsJapanese.push('腕');break;
                    case 'chest': selectedItemsJapanese.push('胸');break;
                    case 'stomach': selectedItemsJapanese.push('腹');break;
                    case 'back': selectedItemsJapanese.push('背');break;
                }
            }
        };
        return selectedItemsJapanese.join('、');
    }

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Header 
                    centerComponent={{ text: '今日の成果', 
                                    　　style: { color: '#fff', fontSize: 20 } 
                                    }}
                    rightComponent={{ icon: 'home', 
                                    　color: '#fff' ,
                                    onPress: () => {navigation.navigate('トレーニング記録')}
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
                        　color={selectedItems.shoulder[2]}
                        　onPress={() => selectPart('shoulder')} />
                    <Text style={{fontSize: 20}}>肩</Text>
                    <Icon name={selectedItems.arm[1]} 
                        　size={30} 
                        　color={selectedItems.arm[2]}
                        　onPress={() => selectPart('arm')} 
                        　style={{marginLeft: 15}} />
                    <Text style={{fontSize: 20}}>腕</Text>
                    <Icon name={selectedItems.chest[1]} 
                        　size={30} 
                        　color={selectedItems.chest[2]}
                        　onPress={() => selectPart('chest')} 
                        　style={{marginLeft: 15}} />
                    <Text style={{fontSize: 20}}>胸</Text>
                    <Icon name={selectedItems.stomach[1]} 
                        　size={30} 
                        　color={selectedItems.stomach[2]}
                        　onPress={() => selectPart('stomach')} 
                        　style={{marginLeft: 15}} />
                    <Text style={{fontSize: 20}}>腹</Text>
                    <Icon name={selectedItems.back[1]} 
                        　size={30} 
                        　color={selectedItems.back[2]}
                        　onPress={() => selectPart('back')} 
                        　style={{marginLeft: 15}} />
                    <Text style={{fontSize: 20}}>背</Text>
                </View>                
                <Button title="保存"
                        style={{ margin: 30, width: 60 }}
                        onPress={ onPressSave }
                />
            </View>
        </TouchableWithoutFeedback>
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