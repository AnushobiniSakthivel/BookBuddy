const BookCard = ({ book }) => {
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.title === book.title);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      cart.push({
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: 1,
        total: book.price
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  };

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const alreadyExists = wishlist.some(item => item.title === book.title);
    
    if (alreadyExists) {
      alert('💖 Already in your wishlist.');
      return;
    }

    wishlist.push({ 
      title: book.title, 
      price: book.price, 
      image: book.image 
    });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('🌟 Added to wishlist!');
  };

  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <h3><a href={book.link} target="_blank" rel="noopener noreferrer">{book.title}</a></h3>
      <p>₹{book.price}</p>
      <div className="card-buttons">
        <button className="add-to-cart" onClick={addToCart}>
          Add to Cart
        </button>
        <button className="add-to-wishlist" onClick={addToWishlist}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default BookCard;