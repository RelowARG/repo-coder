import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'; // Importar Mongoose
import { productModel } from './models/product.model.js'; // Importar el modelo de productos
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8080;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a MongoDB exitosa!');
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas para las vistas Handlebars
app.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Configurar los filtros de búsqueda
        const filter = {};
        if (query) {
            filter.$or = [
                { category: { $regex: query, $options: 'i' } },
                { status: query.toLowerCase() === 'true' }
            ];
        }

        // Configurar las opciones de ordenamiento
        const sortOptions = {};
        if (sort === 'asc') {
            sortOptions.price = 1;
        } else if (sort === 'desc') {
            sortOptions.price = -1;
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sortOptions,
            lean: true // Para obtener objetos JavaScript planos
        };

        const products = await productModel.paginate(filter, options);
        
        // Construir los links para las paginación de la vista
        const buildLink = (pageNumber) => {
            const url = new URL(`${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`);
            url.searchParams.set('page', pageNumber);
            if (limit) url.searchParams.set('limit', limit);
            if (sort) url.searchParams.set('sort', sort);
            if (query) url.searchParams.set('query', query);
            return url.toString();
        };

        res.render('index', {
            status: 'success',
            products: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? buildLink(products.prevPage) : null,
            nextLink: products.hasNextPage ? buildLink(products.nextPage) : null
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al cargar la vista de productos.');
    }
});

app.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).populate('products.product').lean();
        if (!cart) {
            return res.status(404).send('Carrito no encontrado.');
        }
        res.render('cart', { cart: cart.products });
    } catch (error) {
        res.status(500).send('Error al cargar la vista del carrito.');
    }
});

// Configuración de Socket.IO
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    const products = await productModel.find().lean();
    socket.emit('updateProducts', products);

    socket.on('newProduct', async (productData) => {
        try {
            await productModel.create(productData);
            const updatedProducts = await productModel.find().lean();
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
            socket.emit('productError', error.message);
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try {
            await productModel.findByIdAndDelete(productId);
            const updatedProducts = await productModel.find().lean();
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
            socket.emit('productError', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Vista de Productos: http://localhost:${PORT}/products`);
    console.log(`Vista de Productos en Tiempo Real: http://localhost:${PORT}/realtimeproducts`);
    console.log(`Rutas de productos API: http://localhost:${PORT}/api/products`);
    console.log(`Rutas de carritos API: http://localhost:${PORT}/api/carts`);
});