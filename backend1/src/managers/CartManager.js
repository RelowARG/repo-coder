import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import crypto from 'crypto';

// Helper para obtener la ruta absoluta del archivo de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../../data/carts.json');

export class CartManager {

    constructor() {
        this.path = dataFilePath;
    }

    // Método para leer los carritos del archivo
    async #getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    // Método para escribir carritos en el archivo
    async #saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    // Método para crear un nuevo carrito
    async createCart() {
        const carts = await this.#getCarts();
        const newCart = {
            id: crypto.randomUUID(), // ID único
            products: []
        };
        carts.push(newCart);
        await this.#saveCarts(carts);
        return newCart;
    }

    // Método para obtener un carrito por su ID
    async getCartById(id) {
        const carts = await this.#getCarts();
        const cart = carts.find(c => c.id === id);
        if (!cart) {
            throw new Error(`No se encontró ningún carrito con el ID '${id}'.`);
        }
        return cart;
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(cartId, productId) {
        const carts = await this.#getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);

        if (cartIndex === -1) {
            throw new Error(`No se encontró el carrito con ID '${cartId}'.`);
        }

        const cart = carts[cartIndex];
        const productIndexInCart = cart.products.findIndex(p => p.product === productId);

        if (productIndexInCart !== -1) {
            // Si el producto ya existe, incrementamos la cantidad
            cart.products[productIndexInCart].quantity += 1;
        } else {
            // Si el producto no existe, lo agregamos al carrito
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        carts[cartIndex] = cart;
        await this.#saveCarts(carts);
        return cart;
    }
}
