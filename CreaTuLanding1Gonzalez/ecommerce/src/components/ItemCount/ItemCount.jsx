import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={decrement}>-</Button>
        <Button disabled sx={{ color: '#fff !important' }}>
          <Typography>{quantity}</Typography>
        </Button>
        <Button onClick={increment}>+</Button>
      </ButtonGroup>
      <Button
        variant="contained"
        onClick={() => onAdd(quantity)}
        disabled={stock === 0}
      >
        Agregar al carrito
      </Button>
    </Box>
  );
};

export default ItemCount;
