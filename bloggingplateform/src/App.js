import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import SignUp from './components/SignUp';
import MyBlogs from './components/MyBlogs';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Authentication successful');
          setLoggedIn(true);
        }
        setAuthCheckComplete(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthCheckComplete(true);
      }
    };

    checkAuthentication();
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  if (!authCheckComplete) {
    return null; // or show a loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <UserDashboard onLogout={() => setLoggedIn(false)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp onSignUpSuccess={() => setLoggedIn(true)} />} />
        <Route path="/myBlogs" element={<MyBlogs />} />
      </Routes>
    </Router>
  );
};

export default App;
