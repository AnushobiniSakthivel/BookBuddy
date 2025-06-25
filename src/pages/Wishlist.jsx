import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WishlistItem from '../components/WishlistItem';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(wishlistData);
  }, []);

  const removeFromWishlist = (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist.splice(index, 1);
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