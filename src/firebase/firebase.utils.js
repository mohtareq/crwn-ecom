import firebase from "firebase/app";
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth'

const config = {
    apiKey: "AIzaSyAmKWTh_Lzw5eF4Bcxi634k2gEOJL-VCHc",
    authDomain: "crwn-db-aa282.firebaseapp.com",
    projectId: "crwn-db-aa282",
    storageBucket: "crwn-db-aa282.appspot.com",
    messagingSenderId: "920047145289",
    appId: "1:920047145289:web:5409d3f2f1faaaac258a98",
    measurementId: "G-159P2PLT1X"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    });

    return transformCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;