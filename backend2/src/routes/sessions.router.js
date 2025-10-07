import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../utils/jwt.js';

const router = Router();

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/api/sessions/failregister',
    session: false
}), (req, res) => {
    res.status(201).send({ status: 'success', message: 'Usuario registrado exitosamente' });
});

router.get('/failregister', (req, res) => {
    res.status(400).send({ status: 'error', error: 'Fallo el registro' });
});

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/sessions/faillogin',
    session: false
}), (req, res) => {
    const user = req.user;
    const payload = {
        user: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }
    };
    
    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1h' });

    res.cookie('jwtCookie', token, {
        httpOnly: true,
        maxAge: 3600000 // 1 hora
    }).send({
        status: 'success',
        message: 'Login exitoso',
    });
});

router.get('/faillogin', (req, res) => {
    res.status(401).send({ status: 'error', error: 'Fallo el inicio de sesión' });
});

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
    res.send({ status: 'success', payload: req.user });
});

export default router;