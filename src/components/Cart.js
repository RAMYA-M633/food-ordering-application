const Cart = ({ cart = [], removeFromCart, totalPrice }) => {
    return (
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            ))}
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;
  