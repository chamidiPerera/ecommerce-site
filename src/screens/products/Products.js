import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productList } from "../../data/ProductsList";
import ProductCard from "../../components/productCard/ProductCard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import "./Products.css";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClearFilters = () => {
    setCategory("");
    setSearchQuery("");
  };

  const filteredProducts = productList.filter((product) => {
    const matchesCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="product-grid">
      {/* Dropdown to filter by category */}
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Tops">Tops</MenuItem>
          <MenuItem value="Bottoms">Bottoms</MenuItem>
          <MenuItem value="Outerwear">Outerwear</MenuItem>
          <MenuItem value="Dresses">Dresses</MenuItem>
        </Select>
      </FormControl>

      {/* Clear filters button */}
      <Button variant="outlined" onClick={handleClearFilters}>
        Clear Filters
      </Button>

      {/* Display filtered products */}
      {filteredProducts.map((product) => (
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
            description={product.description}
            availability={product.availability}
          />
        </div>
      ))}
    </div>
  );
}

export default Products;
