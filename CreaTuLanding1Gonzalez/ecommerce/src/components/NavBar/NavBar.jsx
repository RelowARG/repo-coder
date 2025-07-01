import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from '@/components/CartWidget/CartWidget.jsx';

// Importaciones de Material-UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const NavBar = () => {
  // Estilo para el enlace de navegación activo
  const activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold',
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo/Título de la tienda */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          TiendaTech
        </Typography>

        {/* Enlaces de navegación */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/" style={({ isActive }) => isActive ? activeStyle : undefined}>
            Catálogo
          </Button>
          <Button color="inherit" component={NavLink} to="/category/laptops" style={({ isActive }) => isActive ? activeStyle : undefined}>
            Laptops
          </Button>
          <Button color="inherit" component={NavLink} to="/category/smartphones" style={({ isActive }) => isActive ? activeStyle : undefined}>
            Smartphones
          </Button>
          <Button color="inherit" component={NavLink} to="/category/accesorios" style={({ isActive }) => isActive ? activeStyle : undefined}>
            Accesorios
          </Button>
        </Box>

        {/* Widget del carrito */}
        <CartWidget />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
