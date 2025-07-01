import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext.jsx';

// Importaciones de Material-UI para el tema
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import darkTheme from './theme/theme'; // Importamos nuestro tema oscuro

// Importación de componentes de página
import NavBar from '@/components/NavBar/NavBar.jsx';
import ItemListContainer from '@/components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from '@/components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from '@/components/Cart/Cart.jsx';
import Checkout from '@/components/Checkout/Checkout.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  return (
    // ThemeProvider aplica el tema oscuro a todos los componentes hijos.
    <ThemeProvider theme={darkTheme}>
      {/* CssBaseline normaliza los estilos del navegador para un aspecto consistente. */}
      <CssBaseline />
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          {/* Usamos el componente Container de MUI para centrar y acolchar el contenido principal */}
          <Container component="main" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={
                <Box sx={{ textAlign: 'center', mt: 10 }}>
                  <Typography variant="h2">404 NOT FOUND</Typography>
                </Box>
              } />
            </Routes>
          </Container>
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;