import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { auth } from './components/firebase';
import { onAuthStateChanged } from "firebase/auth";
import Layout from './components/layout/layout';
import './App.scss';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setLoggedIn(true);
        } else {
            // User is signed out
            setLoggedIn(false);
        }
    });
  }, [loggedIn])

  return (
    <BrowserRouter>
      <Layout loggedIn={loggedIn} />
    </BrowserRouter>
  );
}

export default App;