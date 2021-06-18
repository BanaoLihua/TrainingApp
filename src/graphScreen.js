import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';

export const graphScreen = () => {

    const [weightData, setWeightData] = useState([]);

    const [dateData, setDateData] = useState([]);

    const storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    });

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            storage.load({key: 'weight'})
            .then(res => {
            setDateData(Object.keys(res).map((e) => {return e.slice(5)}));
            setWeightData(Object.values(res).map(Number))
            })
            .catch(err => {console.warn(err)})
        })
        return unsubscribe;
    }, [weightData])

    // Echartの使い方：https://echarts.apache.org/en/index.html
    const option = {
        tooltip: {
            trigger: "axis"
        },
        xAxis: {
            name: '日付',
            type: "category",
            data: dateData,
        },
        yAxis: {
            name: '体重(kg)',
            type: "value",
            max: 70,
            min: 40
        },
        series: [{
            data: weightData,
            type: "line"
        }]
    };

    return (
        <TouchableWithoutFeedback>
            <View style={styles.chartContainer}>
                <Header centerComponent={{ text: '体重の推移', 
                                        　　style: { color: '#fff', fontSize: 20 } 
                                        }}
                        rightComponent={{ icon: 'home', 
                                        　color: '#fff' ,
                                        onPress: () => {navigation.navigate('トレーニング記録')}
                                    　　}} />
                <ECharts option={option} />
            </View>
        </TouchableWithoutFeedback>
    );}

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    }
});