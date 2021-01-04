// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react'
// import { firebase } from './src/firebase/config'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
// import {decode, encode} from 'base-64'
// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }

// const Stack = createStackNavigator();

// export default function App() {

//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const usersRef = firebase.firestore().collection('users');
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         usersRef
//           .doc(user.uid)
//           .get()
//           .then((document) => {
//             const userData = document.data()
//             setLoading(false)
//             setUser(userData)
//           })
//           .catch((error) => {
//             setLoading(false)
//           });
//       } else {
//         setLoading(false)
//       }
//     });
//   }, []);

//   if (loading) {
//     return (
//       <></>
//     )
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         { user ? (
//           <Stack.Screen name="Home">
//             {props => <HomeScreen {...props} extraData={user} />}
//           </Stack.Screen>
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Registration" component={RegistrationScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




import React, { Component } from 'react'
import { Text, View, Image, Dimensions, FlatList,TouchableOpacity } from 'react-native'
import ImagePicker from "react-native-customized-image-picker";
const { height, width } = Dimensions.get('window');


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ImgArr: [],
      photo:[]
    }
  }


  selectMultiImage() {
    let data=[]
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      console.log(images);
      images.map((item,index)=>{
             data.push({uri:Platform.OS === 'android'? item.path: item.path.replace('file://', ''),
            type: item.mime,name:`Test${index}`})
      })
      console.log("data",data);

      this.setState({ ImgArr: images,photo:data })
    });
  }

  deleteImage( item, index){
    const {photo}=this.state
    photo.splice(index, 1);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
      onPress={( item, index)=>this.deleteImage( item, index)}
      style={{ height: height / 4, width: width / 2.5, backgroundColor: 'pink', justifyContent: 'center' }}>
        <Image
          resizeMode="cover"
          source={{ uri: item.uri
            // "file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20210103-WA0024.jpg" 
          }}
          style={{
            width: height / 5,
            height: height / 5,
            borderRadius: height / 10,
            overflow: 'hidden',
            borderWidth: width / 80,
            borderColor: "white",
          }}
        />

      </TouchableOpacity>
    )
  }



  handleFormDetail(){
    let formdata = new FormData();
    formdata.append('name', name);

    formdata.append('image', avatarSource);
    formdata.append('status', true);
    addon_id.map((item, index) => {
      formdata.append(`image[${index}]`, item);
    });
    formdata.append('WorkStationType_id', stationTypeId);
    // await globalPostApi(Config.updateWorkStation, formdata)

  }


  render() {
    return (
      <View>
        <Text onPress={() => this.selectMultiImage()}> textInComponent </Text>
        <FlatList
          data={this.state.photo}
          renderItem={this.renderItem}
          horizontal

        />


      </View>
    )
  }
}
