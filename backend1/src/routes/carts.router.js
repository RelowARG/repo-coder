import { Router } from 'express';
import { CartManager } from '../managers/CartManager.js';
import { ProductManager } from '../managers/ProductManager.js'; // Para validar que el producto exista

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager(); // Instancia para validaciones

// POST /api/carts/
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al crear el carrito.' });
    }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        res.status(200).json(cart.products);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // Primero, verificamos que el producto que se quiere agregar realmente exista
        await productManager.getProductById(pid);

        // Si el producto existe, lo agregamos al carrito
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.status(200).json({ message: `Producto con ID '${pid}' agregado al carrito '${cid}'.`, cart: updatedCart });

    } catch (error) {
        // Capturamos errores tanto del producto no encontrado como del carrito no encontrado
        res.status(404).json({ error: error.message });
    }
});

export default router;
