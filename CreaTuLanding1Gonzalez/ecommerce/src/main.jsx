import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Punto de entrada de la aplicación. Se selecciona el elemento 'root' del DOM.
const container = document.getElementById('root');
const root = createRoot(container);

// Se renderiza el componente principal 'App' dentro del 'root'.
// StrictMode activa verificaciones y advertencias adicionales para sus descendientes.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
