import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBNp6CSxIRFzKGPpb0FMOzEc_9fWtmRL6E",
    authDomain: "pepega-milk-shake-prototype.firebaseapp.com",
    databaseURL: "https://pepega-milk-shake-prototype.firebaseio.com",
    projectId: "pepega-milk-shake-prototype",
    storageBucket: "pepega-milk-shake-prototype.appspot.com",
    messagingSenderId: "969297076824",
    appId: "1:969297076824:web:aa77cad94fd9b34c14e02d"
  }
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig)


  // export firestore database
  export default firebaseApp.firestore()