import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import "./AddQuantityButtons.css";

function AddQuantityButtons({ maxQuantity, setQuantity }) {
  const [count, setCount] = useState(1);

  function increment() {
    setCount((prevCount) => {
      const newCount = Math.min(prevCount + 1, maxQuantity);
      setQuantity(newCount);
      return newCount;
    });
  }

  function decrement() {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 1);
      setQuantity(newCount);
      return newCount;
    });
  }

  return (
    <ButtonGroup className="button-group" size="large" color="primary">
      <Button
        className="button"
        onClick={decrement}
        variant="text"
        disabled={count <= 1}
      >
        -
      </Button>
      <h4>{count}</h4>
      <Button
        className="button"
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
