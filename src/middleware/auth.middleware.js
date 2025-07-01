import { body, check, validationResult } from "express-validator";

// Validacion de Registro
const register = [
    check('name').exists().notEmpty().withMessage('El nombre es obligatorio'),
    check('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    check('email').exists().notEmpty().isEmail().withMessage('Email inválido'),
    check('password').exists().notEmpty().isLength({ min: 8, max: 24 }).withMessage('Contraseña inválida'),
    check('password').matches(/[A-Z]/).withMessage('Debe tener una mayúscula'),
    check('password').matches(/[a-z]/).withMessage('Debe tener una minúscula'),
    check('password').matches(/[!@#$%^&/_*]/).withMessage('Debe tener un símbolo'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Error",
                message: "Errores de validación",
                errors: errors.array()
            });
        }
        next();
    }
];

// Validacion de Login
const login = [
    check('email').notEmpty().isEmail().withMessage('Email inválido'),
    check('password').notEmpty().isLength({ min: 8 }).withMessage('Contraseña inválida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Error",
                message: "Errores de validación",
                errors: errors.array()
            });
        }
        next();
    }
];

export const validation = { register, login };