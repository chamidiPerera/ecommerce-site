import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import AddQuantityButtons from '../increamentDecreamentButtons/AddQuantityButtons';
import './ProductDetails.css';

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mainImage, setMainImage] = useState(item.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const location = useLocation();
  const item = location.state;

  const totalAmount = item.price * quantity;

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (loggedInEmail) {
      const user = users.find((user) => user.email === loggedInEmail);
      setLoggedInUser(user);
    }
  }, []);

  const handleAddToCart = () => {
    if (!loggedInUser) {
      toast.error('Please login to add items to the cart');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const updatedUser = { ...loggedInUser };
    const cart = updatedUser.cart || [];

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === selectedSize,
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].totalAmount += totalAmount;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        totalAmount,
        size: selectedSize,
      });
    }

    updatedUser.cart = cart;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(
      (user) => user.email === loggedInUser.email,
    );

    if (userIndex > -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }

    toast.success('Item added to cart');
  };

  const handleThumbnailHover = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-details">
      <div className="left-side">
        <img className="item-image" src={mainImage} alt={item.name} />
        <div className="thumbnail-images">
          {item.thumbnailImages?.map((thumbnail, index) => (
            <img
              key={index}
              className="thumbnail-image"
              src={thumbnail}
              alt={`thumbnail-${index}`}
              onMouseEnter={() => handleThumbnailHover(thumbnail)}
            />
          ))}
        </div>
      </div>

      <div className="right-side">
        <h2 className="product-name">{item.name}</h2>
        <h3 className="price">LKR {item.price}</h3>

        <h4
          className={`stock-info ${
            item.availability === 0 ? 'out-of-stock' : 'in-stock'
          }`}
        >
          {item.availability} in stock
        </h4>

        <div className="product-description">
          <Typography variant="body1">{item.description}</Typography>
        </div>

        <div className="size-selection">
          <h4>Select Size:</h4>
          <div className="size-options">
            {item.sizes.map((size, index) => (
              <div
                key={index}
                className={`size-option ${
                  selectedSize === size ? 'selected' : ''
                }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="color-selection">
          <h4>Available Colors:</h4>
          <div className="color-options">
            {item.colors.map((color, index) => (
              <div key={index} className="color-option">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="material-info">
          <h4>Material:</h4>
          <p>{item.material}</p>
        </div>
        <div className="care-instructions">
          <h4>Care Instructions:</h4>
          <p>{item.careInstructions}</p>
        </div>

        <AddQuantityButtons
          maxQuantity={item.availability}
          setQuantity={setQuantity}
        />

        <h3 className="total-price">Total: LKR {totalAmount}</h3>

        <Button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
