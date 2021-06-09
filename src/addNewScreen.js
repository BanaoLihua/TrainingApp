import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { saveData } from './store';
import { useNavigation } from '@react-navigation/native';


export const addNewScreen = () => {

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>addNew</Text>
            <Button title="SAVE" onPress={saveData} />
            <Button title="GoBack" onPress={navigation.goBack} />
        </View>
    );
}