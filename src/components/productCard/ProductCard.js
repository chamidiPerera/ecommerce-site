import React from "react";
import "./ProductCard.css";

function ProductCard({ image, name, price, availability }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p className="product-price">
        {availability > 0 ? `LKR ${price}` : "SOLD OUT"}
      </p>
    </div>
  );
}

export default ProductCard;
