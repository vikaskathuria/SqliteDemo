// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    Text,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const Login = ({ navigation }) => {
    let [userName, setUserName] = useState('');
    let [userContact, setUserContact] = useState('');
    let [userAddress, setUserAddress] = useState('');
    let [userData, setUserData] = useState({});

    let register_user =async () => {
        console.log(userName, userContact, userAddress);

        if (!userContact) {
            alert('Please fill Contact Number');
            return;
        }

        db.transaction(async function (tx) {
            tx.executeSql(
                'SELECT * FROM table_user where user_contact = ?',
                [userContact],
                async (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        const jsonValue = JSON.stringify(results.rows.item(0))
                        await AsyncStorage.setItem('userToken', jsonValue)
                        navigation.dispatch(StackActions.replace('HomeScreen'));
                        setUserData(results.rows.item(0));
                    } else {
                        alert('No not found in database');
                    }
                },
            );
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Mytextinput
                                placeholder="Enter Contact No"
                                onChangeText={(userContact) => setUserContact(userContact)}
                                maxLength={10}
                                keyboardType="numeric"
                                style={{ padding: 10 }}
                            />
                            <Mybutton title="Submit" customClick={register_user} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
                    Example of SQLite Database in React Native
        </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
                    www.aboutreact.com
        </Text>
            </View>
        </SafeAreaView>
    );
};

export default Login;
