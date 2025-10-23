import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers/users.controller.js';

const router = Router();

// Endpoint para solicitar el correo de recuperación
router.post('/forgot-password', forgotPassword);

// Endpoint para restablecer la contraseña con el token
router.post('/reset-password', resetPassword);

export default router;