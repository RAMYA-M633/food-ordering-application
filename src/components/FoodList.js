const FoodList = ({ foodItems, addToCart }) => {
    return (
      <div className="food-list">
        {foodItems.map((foodItem) => (
          <div className="food-item" key={foodItem.id}>
            <img src={foodItem.image} alt={foodItem.title} />
            <h3>{foodItem.title}</h3>
            <p>${foodItem.price}</p>
            <button onClick={() => addToCart(foodItem)}>Add to Cart</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default FoodList;
  