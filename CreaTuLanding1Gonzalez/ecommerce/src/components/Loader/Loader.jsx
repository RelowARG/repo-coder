import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Componente de carga usando CircularProgress de Material-UI
const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64vh' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
