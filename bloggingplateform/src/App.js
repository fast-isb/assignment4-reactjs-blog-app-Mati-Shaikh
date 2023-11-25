// import React, { useState, useEffect } from 'react';
// import BlogsList from './components/BlogsList';
// import Navbar from './components/navbar';
// import Footer from './components/footer';
// import SignIn from './components/Login';
// import Admin from './components/Admin';
// import UserDashboard from './components/UserDashboard';


// const App = () => {
//   /*
//   const [isLoggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check local storage for login status on component mount
//     const storedLoginStatus = localStorage.getItem('isLoggedIn');
//     if (storedLoginStatus) {
//       setLoggedIn(true);
//     }
//   }, []);

//   // Callback function to update the login state
//   const handleLoginSuccess = () => {
//     setLoggedIn(true);
//     // Store login status in local storage
//     localStorage.setItem('isLoggedIn', 'true');
//   };

//   // Callback function to handle logout
//   const handleLogout = () => {
//     setLoggedIn(false);
//     // Remove login status from local storage on logout
//     localStorage.removeItem('isLoggedIn');
//   };
//   */

//   return (
//     <>
//     {<UserDashboard/>}
    
//       {/* {isLoggedIn ? (
//         <>
//           <Navbar onLogout={handleLogout} />
//           <BlogsList />
//           <Footer />
//         </>
//       ) : (
//         <SignIn onLoginSuccess={handleLoginSuccess} />
//       )} */}
      
//     </>
//   );
// };

// export default App;

/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
*/import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SignIn from './components/Login';
import UserDashboard from './components/UserDashboard';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // You may want to clear the token from local storage here
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <UserDashboard onLogout={handleLogout} /> : <SignIn onLoginSuccess={handleLoginSuccess} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
