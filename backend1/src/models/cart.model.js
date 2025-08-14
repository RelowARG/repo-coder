import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products', // Referencia al modelo de productos
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
});

export const cartModel = model('carts', cartSchema);