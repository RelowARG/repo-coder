import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';
import initializePassport from './config/passport.config.js';
import config from './config/config.js'; // 1. Importamos la configuración

const app = express();
// 2. Usamos el puerto desde la configuración
const PORT = config.port;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de Passport
initializePassport();
app.use(passport.initialize());

// Conexión a la Base de Datos
// 3. Usamos la URL de Mongo desde la configuración
mongoose.connect(config.mongoUrl)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.error('Error al conectar a la base de datos:', error));

// Rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter); // 2. Usa el nuevo router

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});