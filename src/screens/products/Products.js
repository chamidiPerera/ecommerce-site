import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

function Products() {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
    <div>
      <div className="products-page-header">
        <div className="products-page-header-text-area">
          <h1>SEASONAL OFFERS</h1>
          <h4>
            This holiday season, enjoy incredible savings with our exclusive
            Christmas discounts!
          </h4>
          <h6>
            Use promo code 1234 to unlock 20% off your purchase. Use promo code
            5678 to enjoy 5% off your order.
          </h6>
        </div>
      </div>
      <div className="filter-section">
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="gray"
          label="Search"
          size="small"
          value={searchQuery}
          onChange={(text) => setSearchQuery(text.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            height: "40px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            "& input": {
              paddingLeft: "12px",
            },
          }}
        />
        <FormControl
          className="category-form"
          sx={{
            width: "450px",
            height: "40px",
          }}
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleChange}
            sx={{
              height: "40px",
              lineHeight: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Tops">Tops</MenuItem>
            <MenuItem value="Bottoms">Bottoms</MenuItem>
            <MenuItem value="Outerwear">Outerwear</MenuItem>
            <MenuItem value="Dresses">Dresses</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          className="filter-btn"
          sx={{
            height: "40px",
            padding: "0 16px",
            minWidth: "200px",
          }}
        >
          Clear Filters
        </Button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
              availability={product.availability}
              product={product}
              id={product.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
