import React, { useEffect, useState } from "react";
import "./Cart.css";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { productList } from "../../data/ProductsList";
import AddQuantityButtons from "../../components/increamentDecreamentButtons/AddQuantityButtons";

function Cart() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (loggedInEmail) {
      const user = users.find((user) => user.email === loggedInEmail);
      if (user) {
        setLoggedInUser(user);

        const userCart = (user.cart || []).map((cartItem) => {
          const product = productList.find((p) => p.id === cartItem.id);
          return {
            ...cartItem,
            image: product?.image || "",
            maxQuantity: product?.availability || 1, // Set max available quantity
          };
        });
        setCartItems(userCart);
      }
    }
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemTotal =
        parseInt(item.price.replace(/,/g, ""), 10) * item.quantity;
      return sum + itemTotal;
    }, 0);
    setTotalCartAmount(total);
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // Remove the selected item
    setCartItems(updatedCart);

    // Update the localStorage for persistence
    if (loggedInUser) {
      const updatedUser = {
        ...loggedInUser,
        cart: updatedCart,
      };
      updateLocalStorageUser(updatedUser);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity; // Update quantity
    setCartItems(updatedCart);

    // Update the localStorage for persistence
    if (loggedInUser) {
      const updatedUser = {
        ...loggedInUser,
        cart: updatedCart,
      };
      updateLocalStorageUser(updatedUser);
    }
  };

  const updateLocalStorageUser = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setLoggedInUser(updatedUser);
  };

  return (
    <div className="cart-page">
      <h1>MY CART</h1>
      {cartItems.length > 0 ? (
        <Box>
          {cartItems.map((item, index) => (
            <Card key={index} className="cart-item">
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <CardContent className="cart-item-details">
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: LKR {item.price}</Typography>
                <Typography>
                  Quantity:
                  <AddQuantityButtons
                    maxQuantity={item.maxQuantity}
                    setQuantity={(newQuantity) =>
                      handleQuantityChange(index, newQuantity)
                    }
                  />
                </Typography>
                <Typography>
                  Total: LKR{" "}
                  {(
                    parseInt(item.price.replace(/,/g, ""), 10) * item.quantity
                  ).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove Item
                </Button>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h5" className="cart-total">
            Grand Total: LKR {totalCartAmount.toLocaleString()}
          </Typography>
        </Box>
      ) : (
        <Typography>Your cart is empty.</Typography>
      )}
    </div>
  );
}

export default Cart;
