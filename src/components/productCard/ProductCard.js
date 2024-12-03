import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ image, name, price, availability, product }) {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`favorite-${product.id}`) ? true : false
  );

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      favorites.push(product);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p className="product-price">
        {availability > 0 ? `LKR ${price}` : "SOLD OUT"}
      </p>
      <button
        onClick={toggleFavorite}
        className={`favorite-button ${isFavorite ? "active" : ""}`}
      >
        {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}

export default ProductCard;
