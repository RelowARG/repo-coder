import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import config from './config.js';

// Importamos la nueva arquitectura
import UserManager from '../dao/mongo/managers/UserManager.js';
import UserRepository from '../repository/UserRepository.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// Instanciamos las clases
const userManager = new UserManager();
const userRepository = new UserRepository(userManager);

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwtCookie'];
    }
    return token;
};

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                // Usamos el repositorio en lugar del modelo directamente
                const user = await userRepository.findOne({ email: username });
                if (user) {
                    return done(null, false, { message: 'El usuario ya existe' });
                }
                const newUserInfo = { first_name, last_name, email, age, password };
                // Usamos el repositorio para crear el usuario
                const newUser = await userRepository.create(newUserInfo);
                return done(null, newUser);
            } catch (error) {
                return done('Error al registrar el usuario: ' + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                // Usamos el repositorio
                const user = await userRepository.findOne({ email: username });
                if (!user || !user.isValidPassword(password)) {
                    return done(null, false, { message: 'Credenciales inválidas' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('current', new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: config.jwtPrivateKey,
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user);
            } catch (error) {
                return done(error);
            }
        }
    ));
};

export default initializePassport;