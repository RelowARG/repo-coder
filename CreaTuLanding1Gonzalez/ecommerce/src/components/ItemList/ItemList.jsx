import React from 'react';
import Item from '@/components/Item/Item.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return <Typography sx={{ textAlign: 'center' }}>No se encontraron productos en esta categoría.</Typography>;
  }

  return (
    // Se añade justifyContent="center" para centrar las tarjetas en la página.
    <Grid container spacing={4} justifyContent="center">
      {products.map(product => (
        // Se quitan los props responsivos (xs, sm, etc.) para que el tamaño del item
        // se base en el tamaño fijo de la tarjeta que contiene.
        <Grid item key={product.id}>
          <Item {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
