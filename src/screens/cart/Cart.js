import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import toast from 'react-hot-toast';
import { productList } from '../../data/ProductsList';
import AddQuantityButtons from '../../components/increamentDecreamentButtons/AddQuantityButtons';
import './Cart.css';

function Cart() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (loggedInEmail) {
      const user = users.find((user) => user.email === loggedInEmail);
      if (user) {
        setLoggedInUser(user);

        const userCart = (user.cart || []).map((cartItem) => {
          const product = productList.find((p) => p.id === cartItem.id);
          return {
            ...cartItem,
            image: product?.image || '',
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
        parseInt(item.price.replace(/,/g, ''), 10) * item.quantity;
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
    if (promoCode === '1234') {
      setDiscount(20);
    } else if (promoCode === '5678') {
      setDiscount(5);
    } else {
      toast.error('Oops! Invalid Promo Code');
      setDiscount(0);
    }
  };

  const updateLocalStorageUser = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user,
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setLoggedInUser(updatedUser);
  };

  return (
    <div className="cart-page">
      <h1>MY CART</h1>
      {cartItems.length > 0 ? (
        <div className="cart-page-content">
          <div className="cart-page-left">
            <div className="cart-table">
              <div className="cart-header">
                <h4>Product</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4>Total</h4>
                <h4>Actions</h4>
              </div>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-row">
                  <div className="cart-product">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image-cart"
                    />
                    <h5>{item.name}</h5>
                  </div>
                  <h5 className="cart-item-price">LKR {item.price}</h5>
                  <div className="cart-item-quantity">
                    <AddQuantityButtons
                      maxQuantity={item.maxQuantity}
                      setQuantity={(newQuantity) =>
                        handleQuantityChange(index, newQuantity)
                      }
                    />
                  </div>
                  <h5 className="cart-item-total">
                    LKR{' '}
                    {(
                      parseInt(item.price.replace(/,/g, ''), 10) * item.quantity
                    ).toLocaleString()}
                  </h5>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteOutlineRoundedIcon className="remove-button" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-page-right">
            <div className="price-section">
              <div className="promo-code">
                <h4>Coupon Code</h4>
                <h4>
                  If you know the promo code to get the discount, please enter
                  it here. The discount will apply only if you are eligible for
                  it
                </h4>
                <TextField
                  label="Enter Promo Code"
                  variant="outlined"
                  size="small"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-code-field"
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
                <h3>Cart Total</h3>
                <div className="total-section-row">
                  <h4>Cart Subtotal: </h4>
                  <h4>LKR {totalCartAmount.toLocaleString()}</h4>
                </div>
                <div className="total-section-row">
                  <h4>Shipping: </h4>
                  <h4>Free</h4>
                </div>
                <div className="total-section-row">
                  <h4>Discount:</h4>
                  <h4>
                    {' '}
                    {discount}% (LKR{' '}
                    {((totalCartAmount * discount) / 100).toLocaleString()})
                  </h4>
                </div>
                <div className="total-section-row">
                  <h3>Cart Total: </h3>
                  <h3>LKR {finalAmount.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Your cart is empty.</h4>
      )}
    </div>
  );
}

export default Cart;
