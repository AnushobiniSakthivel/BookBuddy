import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      const syncLoginState = () => {
        const status = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(status);
      };

      syncLoginState(); 

      window.addEventListener('storage', syncLoginState);

      return () => window.removeEventListener('storage', syncLoginState);
    }, []);


  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;