import { Router } from 'express';
import passport from 'passport';
import {
    registerUser,
    failRegister,
    loginUser,
    failLogin,
    getCurrentUser
} from '../controllers/sessions.controller.js';

const router = Router();

// Ruta para registrar un usuario
router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/api/sessions/failregister', session: false }),
    registerUser
);

router.get('/failregister', failRegister);

// Ruta para iniciar sesión
router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin', session: false }),
    loginUser
);

router.get('/faillogin', failLogin);

// Ruta para obtener el usuario actual a partir del token JWT
router.get(
    '/current',
    passport.authenticate('current', { session: false }),
    getCurrentUser
);

export default router;