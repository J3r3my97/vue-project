import firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCgdFPfKbgdO-GiGeNkiUcHTicA4VtXa0c",
  authDomain: "todolist-526b8.firebaseapp.com",
  databaseURL: "https://todolist-526b8.firebaseio.com",
  projectId: "todolist-526b8",
  storageBucket: "todolist-526b8.appspot.com",
  messagingSenderId: "717186042048"
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firestore;
