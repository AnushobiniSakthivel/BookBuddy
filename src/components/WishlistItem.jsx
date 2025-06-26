const WishlistItem = ({ item, index, onRemove }) => {
  return (
    <div className="wishlist-item">
      <img src={item.image} alt={item.title} />
      <div className="wishlist-details">
        <h3>{item.title}</h3>
        <p>Price: ₹{item.price}</p>
        <button className="remove-btn" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default WishlistItem;