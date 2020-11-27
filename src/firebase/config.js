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


const firebaseConfig = {
  apiKey: "AIzaSyCotvqq_tPyhdtoJgaTEghwgoGQkPLDD_I",
  authDomain: "fir-demo-7a2e6.firebaseapp.com",
  databaseURL: "https://fir-demo-7a2e6.firebaseio.com",
  projectId: "fir-demo-7a2e6",
  storageBucket: "fir-demo-7a2e6.appspot.com",
  messagingSenderId: "979418951992",
  appId: "1:979418951992:web:8b1bb31acea7c3452d11cd",
  measurementId: "G-HX7J27VZ1L"
};



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
