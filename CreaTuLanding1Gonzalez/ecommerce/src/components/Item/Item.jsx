import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';

const Item = ({ id, name, price, img, stock }) => {
  return (
    // Se establece un tamaño fijo para forzar la uniformidad en todas las tarjetas.
    <Card sx={{ height: 309, width: 180, display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardActionArea component={Link} to={`/item/${id}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Contenedor de la imagen con altura fija */}
        <CardMedia
          component="img"
          sx={{ 
            height: 140, // Altura ajustada para la nueva proporción
            objectFit: 'cover' // 'cover' asegura que la imagen llene el espacio de manera uniforme
          }}
          image={img}
          alt={name}
        />
        {/* El CardContent ahora es un contenedor flex que crecerá para llenar el espacio */}
        <CardContent sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Este Box para el título tiene una altura mínima para estandarizar el espacio */}
          <Box sx={{ minHeight: '3.6em' }}> {/* Se reserva espacio para hasta 2 líneas de título */}
            <Typography gutterBottom variant="h6" component="div" sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                fontSize: '1rem' // Ajuste de tamaño de fuente para mejor encaje
            }}>
              {name}
            </Typography>
          </Box>
          {/* Este Box para el precio se empuja hacia abajo con mt: 'auto' */}
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              ${price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {stock}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Item;
