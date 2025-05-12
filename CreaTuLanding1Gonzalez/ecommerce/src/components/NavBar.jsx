import React from 'react';
// Importa el componente CartWidget
import CartWidget from './CartWidget';
// Opcional: crea este archivo CSS en src/components/
// import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Logo o nombre de la tienda */}
        <span>Mi Tienda Online</span>
      </div>
      <ul className="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Categoría</a></li> {/* Ejemplo de enlace de categoría */}
      </ul>
      <div className="navbar-cart">
        {/* Renderiza el CartWidget */}
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;