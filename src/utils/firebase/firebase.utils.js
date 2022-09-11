import { initializeApp } from 'firebase/app';
import { getAuth,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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
  export const auth = getAuth();//returns an auth instance
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);//returns user-credential object
  export const db = getFirestore();//returns database instance
  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd,field) =>{

      const collectionRef = collection(db,collectionKey);
      const batch = writeBatch(db);
      objectsToAdd.forEach((object)=>{

          const docRef=doc(collectionRef,object.title.toLowerCase())
          batch.set(docRef,object);

      });

      await batch.commit();
      console.log('done');

  } 

  export const getCategoriesAndDocuments = async () => {

       const collectionRef = collection(db,'categories');
       const q = query(collectionRef);
       const querySnapshot = await getDocs(q);
       const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{

        const { title,items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;

       },{});
       return categoryMap;

  }
  export const createUserDocumentFromAuth = async( userAuth,additionalInformation = {}) => {

    // creates db instance...under "users collection" and with object returned from sign-in uid
      const userDocRef = doc(db, 'users',userAuth.uid);// returns Document Reference object
      //console.log(userDocRef);
      const userSnapshot = await getDoc(userDocRef);//returns Document snapshot object
      //console.log(userSnapshot);
      console.log(userSnapshot.exists());
      //if userSnapshot.exists is false at default
      //if !userSnapshot.exists is true then create Doc Ref Obj to register user 
      if(!userSnapshot.exists()){

        const { displayName, email } = userAuth;
        const createdAt = new Date();

          try{

            await setDoc(userDocRef,{
              displayName,
              email,
              createdAt,
              ...additionalInformation,

            });
          }catch(error){

          console.log('error creating the user', error.message);

        }

      }

      //check if user data exists

      //if user data doesnt exist then create/set the document with data from userAuth in collection

      //return userdocment reference
      return userDocRef;

  };
////////////CREATING USER DOCUMENT//////////////////////////////////////////
  export const createAuthUserWithEmailAndPassword = async (email, password) => {

      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth,email,password);

  };

  ///////////SIGNING USER IN/////////////////////////////////////////////////////
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);

};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

    

