import express from 'express';
import { createServer } from 'http'; // Necesario para integrar socket.io con Express
import { Server as SocketIOServer } from 'socket.io'; // Importar Server de socket.io
import handlebars from 'express-handlebars'; // Importar express-handlebars
import path from 'path'; // Necesario para trabajar con rutas de archivos
import { fileURLToPath } from 'url'; // Necesario para __dirname en módulos ES

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { ProductManager } from './managers/ProductManager.js'; // Importar ProductManager

// Helpers para simular __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización de la aplicación Express
const app = express();
const PORT = 8080;

// Crear un servidor HTTP a partir de la aplicación Express
const httpServer = createServer(app);
// Crear una instancia de Socket.IO, adjuntándola al servidor HTTP
const io = new SocketIOServer(httpServer);

const productManager = new ProductManager(); // Instancia de ProductManager

// Middlewares para parsear el body de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // Servir archivos estáticos desde 'public'

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views')); // Establecer el directorio de vistas
app.set('view engine', 'handlebars'); // Usar Handlebars como motor de plantillas

// Rutas principales de la API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas para las vistas Handlebars
app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

// Configuración de Socket.IO
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    // Emitir la lista actual de productos al cliente recién conectado
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    // Escuchar eventos de 'newProduct' desde el cliente
    socket.on('newProduct', async (productData) => {
        try {
            await productManager.addProduct(productData);
            const updatedProducts = await productManager.getProducts();
            io.emit('updateProducts', updatedProducts); // Emitir la lista actualizada a todos los clientes
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
            socket.emit('productError', error.message); // Enviar error al cliente que intentó agregar
        }
    });

    // Escuchar eventos de 'deleteProduct' desde el cliente
    socket.on('deleteProduct', async (productId) => {
        try {
            await productManager.deleteProduct(productId);
            const updatedProducts = await productManager.getProducts();
            io.emit('updateProducts', updatedProducts); // Emitir la lista actualizada a todos los clientes
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
            socket.emit('productError', error.message); // Enviar error al cliente que intentó eliminar
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar el servidor HTTP (ahora con Socket.IO integrado)
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Vista Home: http://localhost:${PORT}/`);
    console.log(`Vista Real-time Products: http://localhost:${PORT}/realtimeproducts`);
    console.log(`Rutas de productos API: http://localhost:${PORT}/api/products`);
    console.log(`Rutas de carritos API: http://localhost:${PORT}/api/carts`);
});