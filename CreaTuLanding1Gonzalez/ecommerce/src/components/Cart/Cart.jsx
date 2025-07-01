import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext.jsx';
import CartItem from '@/components/CartItem/CartItem.jsx';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const Cart = () => {
  const { cart, clearCart, totalItems, totalPrice, removeItem } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>Su carrito está vacío</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Aún no ha agregado productos.</Typography>
        <Button component={Link} to="/" variant="contained" size="large">
          Ver productos
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>Su Carrito</Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List>
          {cart.map(p => <CartItem key={p.id} {...p} onRemove={removeItem} />)}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="error" onClick={clearCart}>
              Limpiar Carrito
            </Button>
            <Button variant="contained" color="success" onClick={() => navigate('/checkout')}>
              Finalizar Compra
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Cart;