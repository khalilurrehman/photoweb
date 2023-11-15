import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJzbUmCSUSVZ-wvq8r6TtLkkEmhM9Ox2k",
    authDomain: "photoweb-83554.firebaseapp.com",
    projectId: "photoweb-83554",
    storageBucket: "photoweb-83554.appspot.com",
    messagingSenderId: "244738948827",
    appId: "1:244738948827:web:9f632fcc610b12d6b416fe"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig);

  //init services
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();
  const projectStorage = firebase.storage();

  //timestamp

  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectFirestore, projectAuth , projectStorage, timestamp}