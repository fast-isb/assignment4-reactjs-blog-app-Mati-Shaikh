import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import SignUp from './components/SignUp'; // Import the SignUp component
import AdminDashboard from './components/Admin';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Successful');
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

  if (!authCheckComplete) {
    return null;
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
        <Route path="/login" element={<Login onLoginSuccess={() => setLoggedIn(true)} />} />
        <Route path="/signup" element={<SignUp onSignUpSuccess={() => setLoggedIn(true)} />} />
      </Routes>
    </Router>
   
  );
};

export default App;
