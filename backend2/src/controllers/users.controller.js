import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../services/mail.service.js';
import config from '../config/config.js';
import UserManager from '../dao/mongo/managers/UserManager.js';
import UserRepository from '../repository/UserRepository.js';
import { UserModel } from '../dao/mongo/models/user.model.js'; // Necesario para isValidPassword

const userManager = new UserManager();
const userRepository = new UserRepository(userManager);

// Controlador para solicitar el reseteo de contraseña
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userRepository.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
        }

        // Generamos un token de corta duración (1 hora)
        const resetToken = jwt.sign({ email }, config.jwtPrivateKey, { expiresIn: '1h' });
        
        await sendPasswordResetEmail(email, resetToken);

        res.send({ status: 'success', message: 'Correo de recuperación enviado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
};

// Controlador para efectuar el reseteo de la contraseña
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verificamos y decodificamos el token
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        const { email } = decoded;

        const user = await userRepository.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
        }

        // Verificamos que la nueva contraseña no sea la misma que la actual
        if (user.isValidPassword(newPassword)) {
            return res.status(400).send({ status: 'error', error: 'No puedes usar la misma contraseña anterior.' });
        }
        
        // El hasheo de la contraseña se hace automáticamente gracias al "pre-save" del modelo
        user.password = newPassword;
        await userRepository.updateUser(email, user);
        
        res.send({ status: 'success', message: 'Contraseña actualizada correctamente.' });

    } catch (error) {
        // Si jwt.verify falla, entra aquí (token expirado o inválido)
        res.status(400).send({ status: 'error', error: 'Token inválido o expirado. Por favor, solicita un nuevo enlace de recuperación.' });
    }
};