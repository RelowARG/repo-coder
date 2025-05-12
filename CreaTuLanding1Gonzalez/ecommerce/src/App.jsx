import React from 'react';
// Importa los componentes que creaste
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
// import './App.css';

function App() {
  // Define el mensaje de bienvenida que quieres pasar a ItemListContainer
  const welcomeMessage = "¡Bienvenido a nuestra tienda!";

  return (
    <> {/* Usamos un Fragment <> porque App renderizará más de un elemento al mismo nivel */}
      {/* Renderiza el NavBar */}
      <NavBar />

      {/* Renderiza el ItemListContainer y le pasa el mensaje como prop 'greeting' */}
      <ItemListContainer greeting={welcomeMessage} />

      {/* Aquí podrías añadir otros elementos globales o secciones futuras */}
    </>
  );
}

export default App;