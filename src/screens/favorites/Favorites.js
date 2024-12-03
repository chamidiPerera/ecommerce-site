import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { favorites: [] };
    setFavorites(user.favorites);
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <div className="product-grid">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() =>
                navigate(`/products/${product.id}`, { state: product })
              }
            >
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                availability={product.availability}
                product={product}
              />
            </div>
          ))
        ) : (
          <p>No favorites added yet!</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
