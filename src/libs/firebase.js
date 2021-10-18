import firebase from "firebase/compat/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCZXS79Ct4wDnYhphQT-gUz9Ppx61xJRFU",
  authDomain: "greencharity-a3030.firebaseapp.com",
  projectId: "greencharity-a3030",
  storageBucket: "greencharity-a3030.appspot.com",
  messagingSenderId: "928144320716",
  appId: "1:928144320716:web:6a2900b81480d9f30d7a69"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
