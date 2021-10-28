import firebase from "src/libs/firebase";

export const firebaseService = {
  async socialMediaAuth(provider) {
    return await firebase.auth().signInWithPopup(provider);
  }
};
