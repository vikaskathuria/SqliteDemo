import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Mybutton from '../components/Mybutton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import { StackActions } from '@react-navigation/native';

export default function Index({ navigation }) {
    let [flatListItems, setFlatListItems] = useState([]);
    async function fetchData() {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:1', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255)),',
                            [],
                        );
                    }
                },
            );
        });
        const jsonValue = await AsyncStorage.getItem('userToken')
        let Data = JSON.parse(jsonValue);
        if (Data) {
            navigation.dispatch(StackActions.replace('HomeScreen'));
        }
      }
      async function createSecondTable(){
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='todo_arr'",
                [],
                function (tx, res) {
                    console.log('item:2', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS todo_arr', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS todo_arr( id INTEGER PRIMARY KEY,title VARCHAR(20),user_id INTEGER)',
                            [],
                        );
                    }
                },
            );
        });

      }
      
     let ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
          },
            (error) => {
              reject(error);
            });
        });
      });
      async function CreateTable() {
        let Table = await ExecuteQuery("CREATE TABLE IF NOT EXISTS todo_arr (id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(20), user_id INTEGER)",[]);
        console.log("Tableeee",Table);
      }
    

    useEffect( () => {
          fetchData();
          CreateTable()
        //   createSecondTable()
    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', }}>
            <Mybutton
                title="Login"
                customClick={() => navigation.dispatch(StackActions.replace('Login'))}
            />

            <Mybutton
                title="Register"
                customClick={() => navigation.dispatch(StackActions.replace('Register'))}
            />
        </View>
    )
}
