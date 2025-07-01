import React from 'react';
import Item from '@/components/Item/Item.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return <Typography sx={{ textAlign: 'center' }}>No se encontraron productos en esta categoría.</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Item {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
