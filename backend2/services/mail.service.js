import nodemailer from 'nodemailer';
import config from '../config/config.js';

// Creamos el "transportador" que se conectará con Gmail para enviar el correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.emailUser,
        pass: config.emailPass
    }
});

/**
 * Envía un correo electrónico con un enlace para restablecer la contraseña.
 * @param {string} email - El correo del destinatario.
 * @param {string} token - El token JWT para la recuperación.
 */
export const sendPasswordResetEmail = async (email, token) => {
    const mailOptions = {
        from: `Soporte Ecommerce <${config.emailUser}>`,
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `
            <h1>Restablece tu contraseña</h1>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
            <a href="http://localhost:8080/reset-password.html?token=${token}">
                <button>Restablecer Contraseña</button>
            </a>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste esto, por favor ignora este correo.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de recuperación enviado a:', email);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};