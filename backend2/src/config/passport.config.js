import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { UserModel } from '../models/user.model.js';
import { PRIVATE_KEY } from '../utils/jwt.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

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
                const user = await UserModel.findOne({ email: username });
                if (user) {
                    return done(null, false, { message: 'El usuario ya existe' });
                }
                const newUserInfo = { first_name, last_name, email, age, password };
                const newUser = await UserModel.create(newUserInfo);
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
                const user = await UserModel.findOne({ email: username });
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
            secretOrKey: PRIVATE_KEY,
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