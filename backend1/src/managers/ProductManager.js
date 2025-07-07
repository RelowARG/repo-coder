import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import crypto from 'crypto';

// Helper para obtener la ruta absoluta del archivo de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../../data/products.json');

export class ProductManager {

    constructor() {
        this.path = dataFilePath;
    }

    // Método para leer los productos del archivo
    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, devolvemos un array vacío
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    // Método para escribir productos en el archivo
    async #saveProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    // Método para agregar un nuevo producto
    async addProduct(productData) {
        const { title, description, code, price, stock, category, thumbnails } = productData;

        // Validaciones básicas
        if (!title || !description || !code || price === undefined || stock === undefined || !category) {
            throw new Error("Todos los campos son obligatorios, excepto 'thumbnails'.");
        }

        const products = await this.getProducts();

        // Validar que el código no se repita
        if (products.some(p => p.code === code)) {
            throw new Error(`Ya existe un producto con el código '${code}'.`);
        }

        const newProduct = {
            id: crypto.randomUUID(), // Generamos un ID único universal
            title,
            description,
            code,
            price: Number(price),
            status: productData.status !== undefined ? productData.status : true, // Por defecto es true
            stock: Number(stock),
            category,
            thumbnails: thumbnails || [] // Si no se provee, es un array vacío
        };

        products.push(newProduct);
        await this.#saveProducts(products);
        return newProduct;
    }

    // Método para obtener un producto por su ID
    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        if (!product) {
            throw new Error(`No se encontró ningún producto con el ID '${id}'.`);
        }
        return product;
    }

    // Método para actualizar un producto
    async updateProduct(id, updates) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            throw new Error(`No se encontró ningún producto para actualizar con el ID '${id}'.`);
        }

        // Prevenimos que el ID sea modificado desde el body
        if (updates.id) {
            delete updates.id;
        }

        // Fusionamos el producto existente con las actualizaciones
        const updatedProduct = { ...products[productIndex], ...updates };
        products[productIndex] = updatedProduct;

        await this.#saveProducts(products);
        return updatedProduct;
    }

    // Método para eliminar un producto
    async deleteProduct(id) {
        let products = await this.getProducts();
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);

        if (products.length === initialLength) {
            throw new Error(`No se encontró ningún producto para eliminar con el ID '${id}'.`);
        }

        await this.#saveProducts(products);
    }
}