import React from "react";
import { productList } from "../../data/ProductsList";
import ProductCard from "../../components/productCard/ProductCard";
import "./Products.css";

function Products() {
  return (
    <div className="product-grid">
      {productList.map((item, index) => (
        <div key={index} className="product-item">
          <ProductCard
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
}

export default Products;
