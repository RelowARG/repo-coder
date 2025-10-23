import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

export default {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
};