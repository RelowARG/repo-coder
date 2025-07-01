import React, { useState, useEffect, useContext, createContext } from 'react';

// Se crea el contexto que almacenará el estado y las funciones del carrito.
const CartContext = createContext();

// Hook personalizado para facilitar el acceso al contexto del carrito desde cualquier componente.
export const useCart = () => useContext(CartContext);

// Componente Proveedor que encapsulará la lógica del carrito y la proveerá a sus hijos.
export const CartProvider = ({ children }) => {
  // Estado para almacenar el array de productos en el carrito.
  const [cart, setCart] = useState([]);
  // Estado para la cantidad total de unidades en el carrito.
  const [totalItems, setTotalItems] = useState(0);
  // Estado para el precio total de la compra.
  const [totalPrice, setTotalPrice] = useState(0);

  // Hook de efecto que se ejecuta cada vez que el estado `cart` es modificado.
  // Su función es recalcular el total de ítems y el precio total.
  useEffect(() => {
    let itemsCount = 0;
    let price = 0;
    cart.forEach(item => {
      itemsCount += item.quantity;
      price += item.quantity * item.price;
    });
    setTotalItems(itemsCount);
    setTotalPrice(price);
  }, [cart]); // El array de dependencias asegura que el efecto se ejecute solo cuando es necesario.

  // Función para agregar un ítem al carrito o actualizar su cantidad si ya existe.
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      // Si el producto no está en el carrito, se añade al array.
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      // Si el producto ya existe, se actualiza únicamente su cantidad.
      const updatedCart = cart.map(prod => 
        prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
      );
      setCart(updatedCart);
    }
  };

  // Función para eliminar un producto del carrito por su ID.
  const removeItem = (itemId) => {
    const cartUpdated = cart.filter(prod => prod.id !== itemId);
    setCart(cartUpdated);
  };

  // Función para vaciar completamente el carrito.
  const clearCart = () => {
    setCart([]);
  };

  // Función auxiliar para verificar si un producto ya se encuentra en el carrito.
  const isInCart = (itemId) => {
    return cart.some(prod => prod.id === itemId);
  };

  // El Provider expone el estado y las funciones a todos los componentes hijos que lo consuman.
  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
