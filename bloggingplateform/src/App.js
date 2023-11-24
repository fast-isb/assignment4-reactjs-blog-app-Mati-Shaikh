/*
import React from 'react';
import BlogsList from './components/BlogsList';
import Navbar from './components/navbar'
import Footer from './components/footer'
import SignIn from './components/SignUp'

const App = () => {
  return (
    <>
      {/* <Navbar/>
      <BlogsList/>
      <Footer/> }
      <SignIn/>
    </>
  );
};

export default App;
*/
import React, { useState } from 'react';
import BlogsList from './components/BlogsList';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SignIn from './components/Login';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Callback function to update the login state
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <BlogsList />
          <Footer />
        </>
      ) : (
        <SignIn onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default App;
