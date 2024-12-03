import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetails.css";
import { Alert, Button } from "@mui/material";
import AddQuantityButtons from "../increamentDecreamentButtons/AddQuantityButtons";

function ProductDetails() {
  const location = useLocation();
  const item = location.state;
  const [quantity, setQuantity] = useState(1);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const totalAmount = item.price * quantity;

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (loggedInEmail) {
      const user = users.find((user) => user.email === loggedInEmail);
      setLoggedInUser(user);
    }
  }, []);

  const handleAddToCart = () => {
    if (!loggedInUser) {
      alert("Please log in to add items to the cart.");
      console.log("users");
      return;
    }

    const updatedUser = { ...loggedInUser };
    const cart = updatedUser.cart || [];

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      // Update the existing item in the cart
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].totalAmount += totalAmount;
    } else {
      // Add a new item to the cart
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        totalAmount,
      });
    }

    updatedUser.cart = cart;

    // Update the user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(
      (user) => user.email === loggedInUser.email
    );

    if (userIndex > -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Show success alert
    setAlertVisible(true);
    console.log(localStorage.getItem("users"));
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <div className="product-details">
      <div className="left-side">
        <img className="item-image" src={item.image} alt={item.name} />
      </div>

      <div className="right-side">
        <h2>{item.name}</h2>
        <h2>LKR {item.price}</h2>
        <h4>{item.availability} in stock</h4>
        <AddQuantityButtons
          maxQuantity={item.availability}
          setQuantity={setQuantity}
        />
        <h3>Total: LKR {totalAmount}</h3>
        <Button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        {alertVisible && <Alert severity="success">Added to cart!</Alert>}
      </div>
    </div>
  );
}

export default ProductDetails;
