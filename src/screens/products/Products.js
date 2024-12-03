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
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

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

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate("/products", {
        state: { searchQuery: searchQuery.toLowerCase() },
      });
    }
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
      height: "40px", // Consistent height
      "& .MuiOutlinedInput-root": {
        height: "40px", // Match the container height
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
    </div>
  );
}

export default Products;
