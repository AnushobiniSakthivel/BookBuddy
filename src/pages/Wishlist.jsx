import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WishlistItem from '../components/WishlistItem';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem('wishlist')) || []);
  }, []);

  const removeFromWishlist = (index) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/category">Browse books</Link></p>
      ) : (
        wishlist.map((item, index) => (
          <WishlistItem key={index} item={item} index={index} onRemove={removeFromWishlist} />
        ))
      )}
    </div>
  );
};

export default Wishlist;