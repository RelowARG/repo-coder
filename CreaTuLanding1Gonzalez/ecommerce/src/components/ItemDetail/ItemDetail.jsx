import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '@/components/ItemCount/ItemCount.jsx';
import { useCart } from '@/context/CartContext.jsx';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const ItemDetail = ({ id, name, category, description, price, img, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    const item = { id, name, price, img };
    addItem(item, quantity);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={img}
            alt={name}
            sx={{ width: '100%', height: 'auto', borderRadius: 2, maxHeight: 500, objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h1">{name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'uppercase', mt: 1 }}>
              {category}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{description}</Typography>
            <Typography variant="h4" color="primary" sx={{ mt: 3, fontWeight: 'bold' }}>
              ${price}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Stock disponible: {stock}
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            {quantityAdded > 0 ? (
              <Button component={Link} to="/cart" variant="contained" color="success" size="large">
                Terminar compra
              </Button>
            ) : (
              <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemDetail;