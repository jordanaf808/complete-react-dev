//  Firestore always returns 2 objects: references and snapshots. they can either be Document or Collection versions.

// Query Reference Object: the "current" place in the database that we are querying.
//  e.g. firestore.doc('/users/userId') or firestore.collections('/users')
//  does not contain data.

// Document Reference Object: perform CRUD methods: .set(), .get(), .update(), .delete()
//  * can also add docs to a collection using: collectionRef.add({ value:prop })

//  we return a  'snapshotObject' from the 'referenceObject' by using docRef.get OR collRef.get()
//  *** a Collection snapshot object is called a 'Query Snapshot Object'

// FireStore returns a snapshot object regardless if it exists or not. We must check if it doesn't: !---.exists returns a boolean.
//  we get the data in the object by calling .data() which returns a JSON object.

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC5QmzPVaqwho0aH7CrAcLXy1TkSBShUr0',
  authDomain: 'e-commerce-e56a3.firebaseapp.com',
  databaseURL: 'https://e-commerce-e56a3.firebaseio.com',
  projectId: 'e-commerce-e56a3',
  storageBucket: 'e-commerce-e56a3.appspot.com',
  messagingSenderId: '1040042807613',
  appId: '1:1040042807613:web:83e99c99585245975f3554',
  measurementId: 'G-3TCRETJXNT',
};

firebase.initializeApp(config);

// Check if userAuth contains anything, then query the database for that user document
// The snapshot will tell us if that document .exists. if not create new doc with userRef.set()

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //  document reference to this location using uid created by firestore.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // get the snapshot object at userRef's document reference.
  const snapShot = await userRef.get();
  // FireStore returns a snapshot object regardless if it exists or not. We must check...
  // if it doesn't exist we create one with our '.set()'
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

//
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  // get a new doc ref and ID for each obj
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
