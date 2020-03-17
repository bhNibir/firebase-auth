import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig)

const provider = new firebase.auth.GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({
    isUserSignIn : false,
    name : '',
    email : '',
    photo : '',
    phone : ''

  })
  const handelSignIn = ()=> {
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const {email, displayName, photoURL, phoneNumber} = result.user
      const signedInUser = {
        isUserSignIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
        phone : phoneNumber
      }
      setUser(signedInUser)
      console.log(email, displayName, photoURL, phoneNumber);
      
    })
    .catch(error =>{
      console.log(error)
      console.log(error.message)
    })
    
  }

  const handelSignOut =() => {
    firebase.auth().signOut()
    .then(response =>{
      const signedOutUser = {
        isUserSignIn : false,
        name : '',
        email : '',
        photo : '',
        phone : ''
    
      }
      setUser(signedOutUser)
    })
    .catch(error => {
      console.log(error)
    })
  }



  return (
    <div className="App">
      <header className="App-header">
        { user.isUserSignIn?<button onClick={handelSignOut}>Sign Out</button> :
          <button onClick={handelSignIn}>Sign in</button>
        }
        <div>
          <h3>{user.name}</h3>
          <p><small>{user.email}</small></p>
          <p><small>{user.phone}</small></p>
          <img src={user.photo} alt="" srcset=""/>
        </div>
      </header>
    </div>
  );
}

export default App;
