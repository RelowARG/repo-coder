import { Router } from 'express';
import { cartModel } from '../models/cart.model.js'; // Importar el nuevo modelo de Mongoose
import { productModel } from '../models/product.model.js';

const router = Router();

// POST /api/carts/
router.post('/', async (req, res) => {
    try {
        const newCart = await cartModel.create({});
        res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al crear el carrito.' });
    }
});

// GET /api/carts/:cid - Ahora con populate
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).populate('products.product').lean();
        if (!cart) {
            return res.status(404).json({ error: `No se encontró ningún carrito con el ID '${cid}'.` });
        }
        res.status(200).json(cart.products);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener el carrito.' });
    }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: `No se encontró el carrito con ID '${cid}'.` });
        }
        
        const product = await productModel.findById(pid);
        if (!product) {
            return res.status(404).json({ error: `No se encontró el producto con ID '${pid}'.` });
        }
        
        const productIndexInCart = cart.products.findIndex(p => p.product.toString() === pid);

        if (productIndexInCart !== -1) {
            cart.products[productIndexInCart].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ message: `Producto con ID '${pid}' agregado al carrito '${cid}'.`, cart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al agregar el producto.' });
    }
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: `No se encontró el carrito con ID '${cid}'.` });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        res.status(200).json({ message: `Producto con ID '${pid}' eliminado del carrito '${cid}'.`, cart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al eliminar el producto.' });
    }
});

// PUT api/carts/:cid - Actualiza todos los productos del carrito
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const cart = await cartModel.findByIdAndUpdate(cid, { products }, { new: true });
        if (!cart) {
            return res.status(404).json({ error: `No se encontró el carrito con ID '${cid}'.` });
        }
        res.status(200).json({ message: `Carrito con ID '${cid}' actualizado exitosamente.`, cart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al actualizar el carrito.' });
    }
});

// PUT api/carts/:cid/products/:pid - Actualiza la cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: `No se encontró el carrito con ID '${cid}'.` });
        }
        if (typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ error: 'La cantidad debe ser un número mayor o igual a 1.' });
        }

        const productIndexInCart = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndexInCart === -1) {
            return res.status(404).json({ error: `Producto con ID '${pid}' no encontrado en el carrito.` });
        }

        cart.products[productIndexInCart].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: `Cantidad del producto '${pid}' en el carrito '${cid}' actualizada.`, cart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al actualizar la cantidad del producto.' });
    }
});

// DELETE api/carts/:cid - Elimina todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
        if (!cart) {
            return res.status(404).json({ error: `No se encontró el carrito con ID '${cid}'.` });
        }
        res.status(200).json({ message: `Todos los productos del carrito '${cid}' han sido eliminados.`, cart });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al vaciar el carrito.' });
    }
});

export default router;