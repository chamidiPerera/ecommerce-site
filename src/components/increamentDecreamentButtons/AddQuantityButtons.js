import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import './AddQuantityButtons.css';

function AddQuantityButtons({ maxQuantity, setQuantity }) {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prevCount) => {
      const newCount = Math.min(prevCount + 1, maxQuantity);
      setQuantity(newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 1);
      setQuantity(newCount);
      return newCount;
    });
  };

  return (
    <ButtonGroup className="button-group" size="large" color="primary">
      <Button
        className="button button-minus"
        onClick={decrement}
        variant="text"
        disabled={count <= 1}
      >
        -
      </Button>
      <h4>{count}</h4>
      <Button
        className="button button-plus"
        onClick={increment}
        variant="text"
        disabled={count >= maxQuantity}
      >
        +
      </Button>
    </ButtonGroup>
  );
}

export default AddQuantityButtons;
