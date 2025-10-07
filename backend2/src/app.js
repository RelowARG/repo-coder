import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import sessionsRouter from './routes/sessions.router.js';
import initializePassport from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de Passport
initializePassport();
app.use(passport.initialize());

// Conexión a la Base de Datos
const MONGO_URL = 'mongodb+srv://<user>:<password>@clusterurl/.../<databaseName>';
mongoose.connect(MONGO_URL)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.error('Error al conectar a la base de datos:', error));

// Rutas
app.use('/api/sessions', sessionsRouter);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});