import React from 'react';
import CartWidget from './CartWidget';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Logo o nombre de la tienda */}
        <span>Mi Tienda!</span>
      </div>
      <ul className="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Categoría</a></li>
      </ul>
      <div className="navbar-cart">
        {/* Renderiza el CartWidget */}
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;