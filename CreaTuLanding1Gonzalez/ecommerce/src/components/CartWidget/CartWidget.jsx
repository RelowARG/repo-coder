import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext.jsx';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <IconButton component={Link} to="/cart" color="inherit" aria-label="cart">
      <Badge badgeContent={totalItems} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartWidget;
