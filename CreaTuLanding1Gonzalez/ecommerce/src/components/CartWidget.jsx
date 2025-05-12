import React from 'react';
// Opcional: crea este archivo CSS en src/components/
// import './CartWidget.css';

const CartWidget = () => {
  // Icono de carrito simple y un número estático
  return (
    <div className="cart-widget">
      🛒 <span className="cart-count">0</span>
    </div>
  );
};

export default CartWidget;