import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import UserDTO from '../dto/UserDTO.js'; // 1. Importamos el DTO

// ... (registerUser, failRegister, loginUser, failLogin no cambian)
export const registerUser = (req, res) => {
    res.status(201).send({ status: 'success', message: 'Usuario registrado exitosamente' });
};

export const failRegister = (req, res) => {
    res.status(400).send({ status: 'error', error: 'Fallo el registro' });
};

export const loginUser = (req, res) => {
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
    
    const token = jwt.sign(payload, config.jwtPrivateKey, { expiresIn: '1h' });

    res.cookie('jwtCookie', token, {
        httpOnly: true,
        maxAge: 3600000
    }).send({
        status: 'success',
        message: 'Login exitoso',
    });
};

export const failLogin = (req, res) => {
    res.status(401).send({ status: 'error', error: 'Fallo el inicio de sesión' });
};

// Controlador para obtener el usuario actual (actualizado)
export const getCurrentUser = (req, res) => {
    // 2. Creamos una instancia del DTO con el usuario de la solicitud
    const userDTO = new UserDTO(req.user);
    // 3. Enviamos el DTO en lugar del usuario completo
    res.send({ status: 'success', payload: userDTO });
};