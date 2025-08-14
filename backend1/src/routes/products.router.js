import { Router } from 'express';
import { productModel } from '../models/product.model.js'; // Importar el nuevo modelo de Mongoose

const router = Router();

// Endpoint GET / con filtros, paginación y ordenamiento
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Configurar los filtros de búsqueda
        const filter = {};
        if (query) {
            // Busca por categoría o estado
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

        const result = await productModel.paginate(filter, options);

        const buildLink = (pageNumber) => {
            const url = new URL(`${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`);
            url.searchParams.set('page', pageNumber);
            if (limit) url.searchParams.set('limit', limit);
            if (sort) url.searchParams.set('sort', sort);
            if (query) url.searchParams.set('query', query);
            return url.toString();
        };

        const response = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ status: 'error', error: 'Error interno del servidor.' });
    }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid).lean();
        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el ID '${pid}'.` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener el producto.' });
    }
});

// ... (otros métodos POST, PUT, DELETE se adaptarían de manera similar)

export default router;