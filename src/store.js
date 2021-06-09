import React from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    storageBackend: AsyncStorage
})

// 保存処理
export const saveData = () => {
    storage.save({
        key: 'test1',
        data: {
            items: {
                '2021-06-08': [
                    {name: 'testtesttest'}
                ],
                '2021-06-10': [
                    {name: 'mirai'}
                ],
                '2021-06-11': [
                    {name: '十一日aiueo'}
                ]
            }
        }
    })
}

// 読込処理
/*
export const loadData = () => {
    storage
    .load({key: 'test1'})
    .then(res => res.items)
    .catch(err => console.warn(err))
}
*/