import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);
  const [total, setTotal] = useState(0);

  const sizePrices = {
    Small: 5,
    Medium: 8,
    Large: 12,
  };

  const toppingOptions = [
    { name: "Extra Cheese", price: 2 },
    { name: "Pepperoni", price: 3 },
    { name: "Mushrooms", price: 1.5 },
    { name: "Onions", price: 1 },
    { name: "Olives", price: 1.5 },
  ];

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setToppings([...toppings, value]);
    } else {
      setToppings(toppings.filter((topping) => topping !== value));
    }
  };

  const calculateTotal = () => {
    let price = 0;
    if (size) {
      price += sizePrices[size];
    }
    toppings.forEach((topping) => {
      const toppingPrice = toppingOptions.find((item) => item.name === topping)?.price || 0;
      price += toppingPrice;
    });
    setTotal(price);
  };

  return (
    <div className="container">
      <h1>🍕 Pizza Billing App</h1>

      <div className="section">
        <h2>Select Size:</h2>
        {Object.keys(sizePrices).map((s) => (
          <label key={s} className="option">
            <input
              type="radio"
              name="size"
              value={s}
              onChange={handleSizeChange}
              checked={size === s}
            />
            {s} (${sizePrices[s]})
          </label>
        ))}
      </div>

      <div className="section">
        <h2>Select Toppings:</h2>
        {toppingOptions.map((topping) => (
          <label key={topping.name} className="option">
            <input
              type="checkbox"
              value={topping.name}
              onChange={handleToppingChange}
              checked={toppings.includes(topping.name)}
            />
            {topping.name} (+${topping.price})
          </label>
        ))}
      </div>

      <button className="calculate-btn" onClick={calculateTotal}>
        Calculate Total
      </button>

      <div className="total">
        <h2>Total Price: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default App;
