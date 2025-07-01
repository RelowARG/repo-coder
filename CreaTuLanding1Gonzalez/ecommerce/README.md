# Proyecto Final: E-commerce con React y Firebase

Este repositorio contiene el código fuente del proyecto final para el curso de React, consistente en una Single Page Application (SPA) de e-commerce.

## Descripción del Proyecto

La aplicación, denominada **TiendaTech**, es un e-commerce de productos tecnológicos. El proyecto fue desarrollado utilizando React y Vite, e integra Firebase como backend para la gestión de la base de datos de productos y el registro de órdenes de compra.

## Funcionalidades Implementadas

- **Catálogo de Productos**: Renderizado dinámico del listado de productos obtenidos desde la base de datos de Firestore.
- **Navegación por Categorías**: Implementación de rutas dinámicas con React Router para filtrar productos según su categoría.
- **Vista de Detalle**: Página individual para cada producto, mostrando información extendida y permitiendo la selección de cantidad.
- **Carrito de Compras (Context API)**: Gestión del estado global del carrito de compras a través de React Context, permitiendo agregar, eliminar y limpiar productos.
- **Componente `ItemCount`**: Componente reutilizable para la selección de cantidad de unidades, con validación de stock.
- **Proceso de Checkout**: Formulario para la captura de datos del comprador y finalización del proceso de compra.
- **Generación de Órdenes en Firestore**: Creación de un nuevo documento en la colección `orders` de Firestore al confirmar una compra, registrando los detalles de la misma.
- **Actualización de Stock**: El stock de los productos se actualiza de forma atómica en Firestore tras una compra exitosa, utilizando operaciones por lotes (`writeBatch`).
- **Feedback al Usuario**: Se provee retroalimentación visual durante los estados de carga (`loaders`) y se informa al usuario sobre el estado de las operaciones (ej. carrito vacío, ID de orden generada).

## Instalación y Ejecución

1.  Clonar el repositorio en su máquina local.
    ```bash
    git clone <URL-del-repositorio>
    ```
2.  Navegar al directorio del proyecto.
    ```bash
    cd <nombre-del-directorio>
    ```
3.  Instalar las dependencias del proyecto.
    ```bash
    npm install
    ```
4.  **Configurar credenciales de Firebase**:
    - Crear un proyecto en la [consola de Firebase](https://firebase.google.com/).
    - Generar las credenciales para una aplicación web.
    - Reemplazar el objeto `firebaseConfig` en el archivo `src/config/firebase.js` con sus credenciales.
    - En la base de datos de Firestore, crear una colección `products` y poblarla con documentos de ejemplo.
5.  Iniciar el servidor de desarrollo de Vite.
    ```bash
    npm run dev
    ```
La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique la consola).

## Tecnologías y Librerías Utilizadas

- **React**: v18+
- **Vite**: Entorno de desarrollo y empaquetador.
- **React Router DOM**: Librería para la gestión de rutas en la SPA.
- **Firebase**: Plataforma de Google utilizada para la base de datos (Firestore).
- **Tailwind CSS**: Framework de CSS para el diseño de la interfaz de usuario.
