import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Inicialización de la aplicación Express
const app = express();
const PORT = 8080;

// Middlewares para parsear el body de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales de la API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor de mi e-commerce!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Rutas de productos: http://localhost:${PORT}/api/products`);
    console.log(`Rutas de carritos: http://localhost:${PORT}/api/carts`);
});
