// https://github.com/tomLadder/react-native-echarts-wrapper#how-to-use
// https://echarts.apache.org/en/index.html
// echartの使い方は上を参照


import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const graphScreen = () => {

    const [weightData, setWeightData] = useState([]);
    const [dateData, setDateData] = useState([]);

    const storage = new Storage({
        storageBackend: AsyncStorage
    });
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            storage.load({key: 'weight'})
            .then(res => {
            setDateData(Object.keys(res));
            setWeightData(Object.values(res).map(Number))
            console.log(weightData);
            console.log(dateData);
            })
            .catch(err => {console.warn(err)})
        })
        return unsubscribe;
    }, [weightData])
    

  const option = {
    tooltip: {
        trigger: "axis",
        formattar: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return (
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear() +
                " : " +
                params.value[1]
            );
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
      type: "category",
      data: dateData
    },
    yAxis: {
      type: "value"
    },
    dataZoom: [{
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: 40,
        endValue: 70
    }],
    series: [
      {
        data: weightData,
        type: "line"
      }
    ]
  };



  const additionalCode = `
        chart.on('click', function(param) {
            var obj = {
            type: 'event_clicked',
            data: param.data
            };

            sendData(JSON.stringify(obj));
        });
    `;

  const onData = param => {
    const obj = JSON.parse(param);

    if (obj.type === "event_clicked") {
      alert(`you tapped the chart series: ${obj.data}`);
    }
  };

  const onRef = ref => {
    if (ref) {
      chart = ref;
    }
  };

    return (
        <SafeAreaView style={styles.chartContainer}>
        <ECharts
            ref={onRef}
            option={option}
            additionalCode={additionalCode}
            onData={onData}
        />
        </SafeAreaView>
    );}
  

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});