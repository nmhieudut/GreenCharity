import firebase from "src/libs/firebase";

export const firebaseService = {
  socialMediaAuth: provider => firebase.auth().signInWithPopup(provider)
};
