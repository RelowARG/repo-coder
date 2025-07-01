import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase.js';
import ItemDetail from '@/components/ItemDetail/ItemDetail.jsx';
import Loader from '@/components/Loader/Loader.jsx';
import Typography from '@mui/material/Typography';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'products', itemId);

    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("El documento solicitado no existe.");
          setProduct(null);
        }
      })
      .catch(error => console.error("Error al obtener el detalle del producto: ", error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <Loader />;
  if (!product) return <Typography variant="h5" sx={{ textAlign: 'center', mt: 10 }}>Producto no encontrado.</Typography>;

  return <ItemDetail {...product} />;
};

export default ItemDetailContainer;
