import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../screens1/HomeScreen/styles';
import { firebase } from '../firebase/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const Todo = () => {
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const userID = ""


    let searchUser = async () => {
        const jsonValue = await AsyncStorage.getItem('userToken')
        let Data = JSON.parse(jsonValue);
        if (Data && Data.user_id) {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM todo_arr where user_id = ?',
                    [Data.user_id],
                    (tx, results) => {
                        var len = results.rows.length;
                        console.log('len', len);
                        if (len > 0) {
                            var temp = [];
                            for (let i = 0; i < len; ++i)
                                temp.push(results.rows.item(i));
                            setEntities(temp)
                            console.log(temp);

                            //   setUserData(results.rows.item(0));
                        } else {
                            alert('No Data found');
                        }
                    },
                );
            });

        }
    };

    useEffect(() => {
        searchUser()
    }, [])

    const onAddButtonPress = async () => {
        const jsonValue = await AsyncStorage.getItem('userToken')
        let Data = JSON.parse(jsonValue);
        let uId = Data && Data.user_id ? Data.user_id : ''

        if (entityText && entityText.length > 0) {
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO todo_arr (title,user_id) VALUES (?,?)',
                    [entityText, uId],
                    (tx, results) => {
                        console.log('Results', results);
                        if (results.rowsAffected > 0) {
                            searchUser()
                        } else alert('Failed');
                    },
                );
            });

        }
    }

    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.title}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item, index) => String(index)}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}

export default Todo
