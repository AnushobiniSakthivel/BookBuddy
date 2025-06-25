import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const cartData = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(cartData);
      const grandTotal = cartData.reduce((sum, item) => sum + item.total, 0);
      setTotal(grandTotal);
    } catch (e) {
      console.error('Error parsing cart data:', e);
      setCart([]);
      setTotal(0);
    }
  }, []);

  const removeItem = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].total = updatedCart[index].price * updatedCart[index].quantity;
    } else {
      updatedCart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + item.total, 0));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/category">Browse books</Link></p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{item.total}</p>
                <button className="remove-btn" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            Grand Total: ₹{total}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;