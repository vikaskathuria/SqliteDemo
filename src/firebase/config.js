import firebase from 'react-native-firebase';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
//   authDomain: 'production-a9404.firebaseapp.com',
//   databaseURL: 'https://production-a9404.firebaseio.com',
//   projectId: 'production-a9404',
//   storageBucket: 'production-a9404.appspot.com',
//   messagingSenderId: '525472070731',
//   appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',
// };


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ_guvKyTZuDVe5WNaGeTG5PN6IVv6vMM",
  authDomain: "fir-dbc24.firebaseapp.com",
  databaseURL: "https://fir-dbc24.firebaseio.com",
  projectId: "fir-dbc24",
  storageBucket: "fir-dbc24.appspot.com",
  messagingSenderId: "818434695053",
  appId: "1:818434695053:web:3ebbb64b06a22fe1e467c4",
  measurementId: "G-JEZT1V1100"
};



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
