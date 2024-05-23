import express, { Request, Response } from 'express';

import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { hashPassword, comparePassword, generateToken } from '../utils/auth'; // Importa las funciones de auth.ts
import UserModel from '@/domain/entities/user.entity';

const authRouter = express.Router();

// Ruta para registrar usuario
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password, age, phone } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            rol: 'paciente',
            age,
            phone,
        });

        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (error) {
        return res.status(500).send({ message: 'Error registering user' });
    }
});

// Ruta para iniciar sesión
authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        LogSuccess(`User logged in with email: ${email}`);
        return res.status(200).send({ token });
    } catch (error) {
        LogError(`Error logging in user: ${error}`);
        return res.status(500).send({ message: 'Error logging in user' });
    }
});

export default authRouter;
