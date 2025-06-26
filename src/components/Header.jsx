import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <header className="home-header">
      <h1>BookBuddy</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/category">Categories</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="category-icons">
        <Link to="/profile" className="profile-icon-link" title="Profile" style={{ marginRight: '1rem' }}>
          <FaUser />
        </Link>
        <Link to="/cart" className="cart-icon-link">
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/wishlist" className="wishlist-icon-link">
          <FaHeart />
        </Link>
      </div>
    </header>
  );
};

export default Header;