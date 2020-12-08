import React, { Component,useEffect,useState } from 'react'
import { Text, View } from 'react-native'
import Mybutton from '../components/Mybutton'


export default function Index({navigation}) {
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        
    }, []);
  
    return (
        <View style={{ flex: 1, justifyContent: 'center',  }}>
        <Mybutton
            title="Login"
            customClick={() => navigation.navigate('Login')}
        />

        <Mybutton
            title="Register"
            customClick={() => navigation.navigate('Register')}
        />
    </View>
)
}
