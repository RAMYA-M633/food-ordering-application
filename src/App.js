import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch data from the Spoonacular API
  useEffect(() => {
    setLoading(true);

    axios
      .get("https://api.spoonacular.com/recipes/complexSearch?apiKey=b51f8d34b22d4d05b1d8398cfd147e82")
      .then((response) => {
        setRecipes(response.data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      })
      .finally(() => setLoading(false));

    // Load cart from local storage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // Add item to the cart
  const addToCart = (recipe) => {
    const newCart = [...cart, recipe];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  // Remove item from cart
  const removeFromCart = (recipeId) => {
    const newCart = cart.filter((item) => item.id !== recipeId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  // Calculate total price of items in cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + (item.price || 10), 0); 
    setTotalPrice(total);
  };

  return (
    <div className="App">
      <h1>Recipe List</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
                alt={recipe.title}
              />
              <p><strong>Price:</strong> ${10}</p> {/* Dummy price displayed here */}
              <button onClick={() => addToCart(recipe)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found. Please try again later.</p>
      )}

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <h3>{item.title}</h3>
                <img
                  src={`https://spoonacular.com/recipeImages/${item.id}-312x231.jpg`}
                  alt={item.title}
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p><strong>Total Price:</strong> ${totalPrice}</p>
            <p><strong>Item Count:</strong> {cart.length}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
