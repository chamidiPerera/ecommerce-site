import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Typography, Box, Button, TextField } from "@mui/material";
import { productList } from "../../data/ProductsList";
import AddQuantityButtons from "../../components/increamentDecreamentButtons/AddQuantityButtons";

function Cart() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

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
            maxQuantity: product?.availability || 1,
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

  useEffect(() => {
    const discountAmount = (totalCartAmount * discount) / 100;
    const final = totalCartAmount - discountAmount;
    setFinalAmount(final);
  }, [totalCartAmount, discount]);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);

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
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);

    if (loggedInUser) {
      const updatedUser = {
        ...loggedInUser,
        cart: updatedCart,
      };
      updateLocalStorageUser(updatedUser);
    }
  };

  const handleApplyPromoCode = () => {
    if (promoCode === "122948") {
      setDiscount(20);
    } else if (promoCode === "5763") {
      setDiscount(5);
    } else {
      alert("Invalid promo code.");
      setDiscount(0);
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
      <Typography variant="h4" gutterBottom>
        My Cart
      </Typography>
      {cartItems.length > 0 ? (
        <Box className="cart-page">
          <Box className="cart-table">
            <Box className="cart-header">
              <Typography className="header-item">Product</Typography>
              <Typography className="header-item">Price</Typography>
              <Typography className="header-item">Quantity</Typography>
              <Typography className="header-item">Total</Typography>
              <Typography className="header-item">Actions</Typography>
            </Box>
            {cartItems.map((item, index) => (
              <Box key={index} className="cart-row">
                <Box className="cart-product">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image-cart"
                  />
                  <Typography>{item.name}</Typography>
                </Box>
                <Typography className="cart-item-price">
                  LKR {item.price}
                </Typography>
                <Box className="cart-item-quantity">
                  <AddQuantityButtons
                    maxQuantity={item.maxQuantity}
                    setQuantity={(newQuantity) =>
                      handleQuantityChange(index, newQuantity)
                    }
                  />
                </Box>
                <Typography className="cart-item-total">
                  LKR{" "}
                  {(
                    parseInt(item.price.replace(/,/g, ""), 10) * item.quantity
                  ).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  className="remove-button"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Box className="price-section">
              <div className="promo-code">
                <TextField
                  label="Enter Promo Code"
                  variant="outlined"
                  size="small"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleApplyPromoCode}
                  className="apply-btn"
                >
                  Apply
                </Button>
              </div>
              <div className="total-section">
                <Typography variant="body1">
                  Subtotal: LKR {totalCartAmount.toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Discount: {discount}% (LKR{" "}
                  {((totalCartAmount * discount) / 100).toLocaleString()})
                </Typography>
                <Typography variant="h5">
                  Total: LKR {finalAmount.toLocaleString()}
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>Your cart is empty.</Typography>
      )}
    </div>
  );
}

export default Cart;
