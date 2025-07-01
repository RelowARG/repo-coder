import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase.js';
import ItemList from '@/components/ItemList/ItemList.jsx';
import Loader from '@/components/Loader/Loader.jsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const productsCollection = collection(db, 'products');
    const q = categoryId ? query(productsCollection, where('category', '==', categoryId)) : productsCollection;

    getDocs(q)
      .then(querySnapshot => {
        const productsAdapted = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsAdapted);
      })
      .catch(error => console.error("Error al obtener los productos: ", error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <Loader />;

  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center', mb: 4, textTransform: 'capitalize' }}>
        {categoryId || 'Nuestro Catálogo'}
      </Typography>
      <ItemList products={products} />
    </Box>
  );
};

export default ItemListContainer;
