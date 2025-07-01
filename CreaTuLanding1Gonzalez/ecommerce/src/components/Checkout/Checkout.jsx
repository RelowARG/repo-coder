import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, writeBatch, addDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase.js';
import { useCart } from '@/context/CartContext.jsx';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm.jsx';
import Loader from '@/components/Loader/Loader.jsx';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const createOrder = async ({ name, phone, email }) => {
    setLoading(true);
    setError('');
    try {
      const orderObj = {
        buyer: { name, phone, email },
        items: cart,
        total: totalPrice,
        date: new Date()
      };

      const batch = writeBatch(db);
      const outOfStock = [];
      const ids = cart.map(prod => prod.id);
      
      const productsRef = collection(db, 'products');
      // Firestore V9 no permite 'in' queries con más de 10 elementos. Para una app real, se debería manejar esto en chunks.
      const productsQuery = query(productsRef, where('__name__', 'in', ids));
      const productsAddedFromFirestore = await getDocs(productsQuery);
      const { docs } = productsAddedFromFirestore;

      docs.forEach(document => {
        const dataDoc = document.data();
        const stockDb = dataDoc.stock;
        const productAddedToCart = cart.find(prod => prod.id === document.id);
        const prodQuantity = productAddedToCart?.quantity;

        if (stockDb >= prodQuantity) {
          batch.update(document.ref, { stock: stockDb - prodQuantity });
        } else {
          outOfStock.push({ id: document.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();
        const orderCollection = collection(db, 'orders');
        const { id } = await addDoc(orderCollection, orderObj);
        setOrderId(id);
        clearCart();
      } else {
        setError('Hay productos que no tienen stock disponible.');
      }
    } catch (error) {
      console.error('Error al crear la orden:', error);
      setError('Hubo un error al procesar su orden. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5">Procesando su orden...</Typography>
        <Loader />
      </Box>
    );
  }

  if (orderId) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" color="success.main" gutterBottom>¡Gracias por su compra!</Typography>
        <Typography>Su orden ha sido creada exitosamente.</Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 2, display: 'inline-block' }}>
            <Typography>ID de la orden: <Typography component="span" sx={{ fontWeight: 'bold' }}>{orderId}</Typography></Typography>
        </Paper>
        <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 3 }}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>Checkout</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <CheckoutForm onConfirm={createOrder} />
    </Box>
  );
};

export default Checkout;