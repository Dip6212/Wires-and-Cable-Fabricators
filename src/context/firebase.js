import { createContext, useContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, serverTimestamp, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCKH5NSbpGA-f-R1FtI9UY_THqaIttvFQI",
  authDomain: "wires-and-cables-fabrication.firebaseapp.com",
  projectId: "wires-and-cables-fabrication",
  storageBucket: "wires-and-cables-fabrication.appspot.com",
  messagingSenderId: "791225269596",
  appId: "1:791225269596:web:f2eef3cdcc47c409e89599",
  databseURL: "https://wires-and-cables-fabrication-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  // const [userInfo, setUserInfo] = useState({
  //   diplayName:"",
  //   photoURL:"",
  //   email:"",
  // });
  const [user,setUser]=useState(null);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // const {displayName,photoURL,email}=user;
      // setUserInfo(
      //   user.displayName=displayName,
      //   user.photoURL=photoURL,
      //   user.email=email
      // );
      setUser(user);
      setLoading(false);
      
    });

    return () => unsubscribe();
  }, []);

  const signupUserWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const getItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "newCategory"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log("Fetched items:", items);
      return items;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  };

  const handleCreateNewListing = async (categoryData) => {
    try {
      await addDoc(collection(db, "items"), categoryData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updateItem = async (id, data) => {
    const itemDoc = doc(db, "items", id);
    return await updateDoc(itemDoc, data);
  };

  const listAllCategories = () => {
    return getDocs(collection(db, "items"));
  };

  const getRating=async ()=>{
    return getDocs(collection(db,"ratings"));
  }


const deleteRatingById = async (ratingId) => {
  try {
    await deleteDoc(doc(db, 'ratings', ratingId));
    toast.success('Rating deleted successfully');
  } catch (error) {
    console.error('Error deleting rating: ', error);
    toast.error('Failed to delete rating');
  }
};
 

  const deleteCategoryById = async (categoryId) => {
    await deleteDoc(doc(db, 'items', categoryId));
  };

  const updateCategoryById = async (categoryId, data) => {
    await updateDoc(doc(db, 'items', categoryId), data);
  };

  const addRating=async (rating,description)=>{
    if(user){
      const {displayName,email,photoURL}=user;
      try {
        await addDoc(collection(db, 'ratings'),{
          displayName,
          email,
          rating,
          description,
          photoURL,
          timestamp: serverTimestamp(),
        });
       
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
    else{
      console.log("pls sign in");
      toast.error("please Sign in First");
    }
  };
  

   const fetchCategoryById = async (id) => {
    const categoryRef = doc(db, "items", id);
    const categoryDoc = await getDoc(categoryRef);
    if (categoryDoc.exists()) {
      return { id: categoryDoc.id, ...categoryDoc.data() };
    } else {
      throw new Error("Category not found");
    }
  };

  const sendMail = async () => {
    try {
      const docRef = doc(db, 'config', 'adminEmail');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const email = docSnap.data().email;
        setAdminEmail(email);
        window.location.href = `mailto:${email}`;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };
  

  const addImage = async (file) => {
    const imageRef = storageRef(storage, `images/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "items", id);
    return  await deleteDoc(itemDoc);
  };

  const deleteImage = async (url) => {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  };

  const signupWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider);
    toast.success(`Logged in Successfully`);
    navigate("/");
  };

  const putData = (key, data) => set(ref(database, key), data);

  const signOutUser = () => {
    return signOut(firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailPassword,
        putData,
        signupWithGoogle,
        user,
        loading,
        signOutUser,
        loginUserWithEmailAndPassword,
        getItems,
        deleteItem,
        updateItem,
        handleCreateNewListing,
        listAllCategories,
        storage,
        storageRef,
        uploadBytes,
        getDownloadURL,
        fetchCategoryById,
        deleteImage,
        addImage,
        updateCategoryById,
        deleteCategoryById,
        addRating,
        getRating,
        sendMail,
        deleteRatingById
      }}
    >
      {!loading && props.children}
    </FirebaseContext.Provider>
  );
};
