import { initializeApp } from 'firebase/app';
import { getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider 
        } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpympEn6U7kQ3qHbeYVC8TRujLEkUh0Mk",
    authDomain: "beyond-clothing-db.firebaseapp.com",
    projectId: "beyond-clothing-db",
    storageBucket: "beyond-clothing-db.appspot.com",
    messagingSenderId: "303263965417",
    appId: "1:303263965417:web:3b5c31453c7c7aa5ff1078"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'

  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async( userAuth ) => {
    // creates db instance...under "users collection" and with object returned from sign-in uid
      const userDocRef = doc(db, 'users',userAuth.uid);
      
      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

          try{
            await setDoc(userDocRef,{
              displayName,
              email,
              createdAt
            });
          }catch(error){
          console.log('error creating the user', error.message);
        }

      }

      //check if user data exists

      //if user data doesnt exist then create/set the document with data from userAuth in collection

      //return userdocment reference
      return userDocRef;
  }
