import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from 'react-alert'
import Compressor from 'compressorjs';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyBh6OcfMlS7Y41xlLLDjts_VrKGjJ2Nc9g",
  authDomain: "bookify-6b527.firebaseapp.com",
  projectId: "bookify-6b527",
  storageBucket: "bookify-6b527.appspot.com",
  messagingSenderId: "867366659920",
  appId: "1:867366659920:web:47047ee49ad7b9af7cee55",
  measurementId: "G-0C8BJRT3MG",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const alert = useAlert()
  const [User, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user){
        setUser(user)
      console.log(user)
      sessionStorage.setItem("uid", user.uid)
    }
      else{ setUser(null)
        console.log(user)
      };
    });
  }, []);
  const isLoggedIn = User ? true : false;
   const signOutUser = ()=>{
    signOut(firebaseAuth).then(user => console.log(user))
   }
   const createUser = (email, password, username, uid)=>{
       setDoc(doc(firestore, "users", uid), {
        email,
        password,
        username,
       }).then(value=>console.log(value))
   }
  const signUp = async(email, password) => {
    // Sign up using auth
   return await createUserWithEmailAndPassword(firebaseAuth, email, password).then((value) => console.log(value)).catch((err) => console.log(err)+ alert.show(err.message));
  };
  const signIn = async(email, password) => {
    // Sign In using Auth
  return await signInWithEmailAndPassword(firebaseAuth, email, password).then((value) => console.log(value)).catch((err) => console.log(err)+  alert.show(err.message));
  };
  const signUpGoogle = () => {
    // sign up using google
    signInWithPopup(firebaseAuth, googleProvider).then((value) => console.log(value), alert("Signed in"));
  };
  const CreateNewListing = async (name, studentID, price, coverPic) => {
    // Wrap the Compressor.js logic in a Promise to wait for compression to finish.
    return new Promise(async (resolve, reject) => {
      new Compressor(coverPic, {
        quality: 0.4,
        success: async (compressedResult) => {
          // Compressed image is ready, proceed with the upload.
          try {
            let username = sessionStorage.getItem("username");
            const imageRef = ref(
              storage,
              `uploads/images/${Date.now()}-${coverPic.name}`
            );
            const uploadResult = await uploadBytes(imageRef, compressedResult);
  
            const docRef = await addDoc(collection(firestore, "books"), {
              name,
              studentID,
              price,
              imageURL: uploadResult.ref.fullPath,
              userID: User.uid,
              userEmail: User.email,
              userdisplayName: username,
              photoURL: User.photoURL,
            });
  
            resolve(docRef); // Resolve the promise when the upload is successful.
          } catch (error) {
            reject(error); // Reject the promise if there's an error.
          }
        },
        error: (error) => {
          reject(error); // Reject the promise if there's an error during compression.
        },
      });
    });
  }
  const listAllBooks = () => {
    // listing books
    return getDocs(collection(firestore, "books"));
  };
  const listAll = () => {
    // listing books
    return getDocs(collection(firestore, "orders"));
  };

  const getImageURL = (path) => {
    // get book image url
    return getDownloadURL(ref(storage, path));
  };
  const getBookById = async (id) => {
    // get book ID
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };
  const getUserById = async (id) => {
    // get book ID
    const docRef = doc(firestore, "users", id);
    const result = await getDoc(docRef);
    return result;
  };
  const placeOrder = async (bookId, qty) => {
    // place order
    let owner = sessionStorage.getItem("owner")
    let bookName = sessionStorage.getItem("book")
   let imageURL =  sessionStorage.getItem("imageURl")
    let price =  sessionStorage.getItem("price")
     let displayName = sessionStorage.getItem("displayName")
     let buyername = sessionStorage.getItem("username")
     let studentID = sessionStorage.getItem("studentID")
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: User.uid,
      buyerEmailEmail: User.email,
      buyerDisplayName: buyername,
      photoURL: User.photoURL,
      qty: Number(qty),
      owner: owner,
      book: bookName,
      price,
      imageURL,
      displayName,
      studentID
    });
    return result;
  };
  const orderDoc = async (qty)=>{
     // place order
     let owner = sessionStorage.getItem("owner")
     let bookName = sessionStorage.getItem("book")
    let imageURL =  sessionStorage.getItem("imageURl")
     let price =  sessionStorage.getItem("price")
      let displayName = sessionStorage.getItem("displayName")
      let buyername = sessionStorage.getItem("username")
      let studentID = sessionStorage.getItem("studentID")
     const collectionRef = collection(firestore, "orders");
     const result = await addDoc(collectionRef, {
       userID: User.uid,
       buyerEmail: User.email,
       buyerDisplayName: buyername,
       photoURL: User.photoURL,
       qty: Number(qty),
       owner: owner,
       book: bookName,
       price,
       imageURL,
       displayName,
       studentID
     });
     return result;
  }
  const fetchMyBooks = async (userID) => {
    // if (!User) return null;
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userID));
    const result = await getDocs(q);
    return result;
  };
  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };
  const getMyBooking = async (userID)=>{
    const collectionRef = collection(firestore, "orders");
    const q = query(collectionRef, where("userID", "==", userID));
    const result = await getDocs(q);
    return result;
  }
  const cancelOrder = async (bookID)=>{
    await deleteDoc(doc(firestore, "orders", bookID)).then(()=>alert.show("Order Canceled"));
  } 
  const deleteOrder = async (bookID)=>{
    await deleteDoc(doc(firestore, "books", bookID)).then(()=>alert.show("Book Deleted"));
  } 
  return (
    <FirebaseContext.Provider
      value={{
        createUser,
        signUp,
        signIn,
        signOutUser,
        signUpGoogle,
        CreateNewListing,
        listAllBooks,
        listAll,
        getImageURL,
        getBookById,
        getUserById,
        placeOrder,
        orderDoc,
        fetchMyBooks,
        getOrders,
        getMyBooking,
        cancelOrder,
        deleteOrder,
        isLoggedIn,
        User,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
