import React, { useState } from "react";
import "./ProductCard.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function ProductCard({ image, name, price, availability, product, id }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`favorite-${product.id}`) ? true : false
  );

  const toggleFavorite = () => {
    let userFavorites = JSON.parse(localStorage.getItem("user")) || {
      favorites: [],
    };

    if (isFavorite) {
      userFavorites.favorites = userFavorites.favorites.filter(
        (fav) => fav.id !== product.id
      );
    } else {
      userFavorites.favorites.push(product);
    }

    localStorage.setItem("user", JSON.stringify(userFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="icon-container">
        <div
          className="icon"
          onClick={() => navigate(`/products/${id}`, { state: product })}
        >
          <VisibilityIcon />
        </div>
        <div className="icon" onClick={toggleFavorite}>
          {isFavorite ? (
            <FavoriteIcon style={{ color: "white" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </div>
      </div>
      <h3>{name}</h3>
      <p className="product-price">
        {availability > 0 ? `LKR ${price}` : "SOLD OUT"}
      </p>
    </div>
  );
}

export default ProductCard;
