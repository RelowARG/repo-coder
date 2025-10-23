// El Repositorio no sabe de dónde vienen los datos, solo utiliza el DAO que le pasamos.
export default class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }

    // Llama al método correspondiente del DAO
    async findOne(query) {
        return await this.userDao.findOne(query);
    }

    async create(user) {
        return await this.userDao.create(user);
    }
    async updateUser(email, user) {
    return await this.userDao.updateUser(email, user);
}
}