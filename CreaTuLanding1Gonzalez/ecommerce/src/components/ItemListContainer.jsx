import React from 'react';
import './ItemListContainer.css';

// Este componente recibe 'greeting' como una prop
const ItemListContainer = ({ greeting }) => {
  return (
    <div className="item-list-container">
      {/* Muestra el mensaje de bienvenida recibido por prop */}
      <h2>{greeting}</h2>

      {/* Marcador de posición para el futuro listado de productos */}
      <p>Aquí se mostrará el catálogo de productos (futura implementación).</p>
    </div>
  );
};

export default ItemListContainer;