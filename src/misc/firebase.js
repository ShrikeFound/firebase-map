import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyABOkOskeeV7W8-sqPqINkVlQuH5b_SPho",
    authDomain: "grid-mapper.firebaseapp.com",
    databaseURL: "https://grid-mapper-default-rtdb.firebaseio.com",
    projectId: "grid-mapper",
    storageBucket: "grid-mapper.appspot.com",
    messagingSenderId: "101575172563",
    appId: "1:101575172563:web:e8978ce6bd67a0a0098f26"
  };

const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth();
export const database = app.database();