
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB5O4fhrbuDcUSnIVEpQ6t8rEMA-Yeq6H4",
    authDomain: "baiert.firebaseapp.com",
    projectId: "baiert",
    storageBucket: "baiert.appspot.com",
    messagingSenderId: "1062051020722",
    appId: "1:1062051020722:web:6ca6aa3ecea47e7499eeab",
    measurementId: "G-W8QQPBXS01"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db = getFirestore()

   export const saveTask = (title, description) => {
    addDoc(collection(db,'tasks'),{title: title, description: description});
  }

  export const getTask = () => getDocs(collection(db,'tasks'))
  export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

  export const deleteTask = id => deleteDoc(doc(db,'tasks', id));

  