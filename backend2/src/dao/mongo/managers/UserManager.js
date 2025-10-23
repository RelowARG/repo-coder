import { UserModel } from '../models/user.model.js';

// Esta clase es la única que tiene contacto directo con la base de datos para los usuarios.
export default class UserManager {
    async findOne(query) {
        return await UserModel.findOne(query);
    }

    async create(user) {
        return await UserModel.create(user);
    }
    async updateUser(email, user) {
    return await UserModel.updateOne({ email: email }, user);
}
}
