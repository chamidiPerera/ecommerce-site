import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab, Button, Menu, MenuItem, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { productList } from '../../data/ProductsList';
import ProductCard from '../../components/productCard/ProductCard';
import './Products.css';

function Products() {
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Filter');

  const categories = [
    'All Categories',
    'Tops',
    'Bottoms',
    'Outerwear',
    'Dresses',
  ];

  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  const handleCategoryChange = (_, newValue) => {
    setCategory(newValue === 0 ? '' : categories[newValue]);
  };

  const handleSortOrderChange = (order, label) => {
    setSortOrder(order);
    setSelectedFilter(label);
    setAnchorEl(null);
  };

  const handleFilterMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredProducts = productList
    .filter((product) => {
      const matchesCategory = category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
        : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'priceHighToLow') return b.price - a.price;
      if (sortOrder === 'priceLowToHigh') return a.price - b.price;
      return 0;
    });

  return (
    <div>
      <div className="products-page-header">
        <div className="products-page-header-text-area">
          <h2>SEASONAL OFFERS</h2>
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
      <h1>SHOP</h1>
      <div className="filter-section">
        <Tabs
          value={category ? categories.indexOf(category) : 0}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            width: '100%',
            maxWidth: 600,
            '& .MuiTabs-indicator': {
              backgroundColor: 'black',
            },
            '& .Mui-selected': {
              color: '#000000',
            },
          }}
        >
          {categories.map((cat, index) => (
            <Tab key={index} label={cat} />
          ))}
        </Tabs>

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterMenuOpen}
          className='filter-btn'
          sx={{
            height: '36px',
            padding: '0 12px',
            minWidth: '200px',
            borderColor: 'black',
            color: 'black',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '8px',
            textTransform: 'capitalize',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          {selectedFilter}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterMenuClose}
        >
          <MenuItem
            onClick={() =>
              handleSortOrderChange('priceHighToLow', 'Price: High to Low')
            }
          >
            Price: High to Low
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleSortOrderChange('priceLowToHigh', 'Price: Low to High')
            }
          >
            Price: Low to High
          </MenuItem>
        </Menu>
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
