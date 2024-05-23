import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import UserModel from '../domain/entities/user.entity';


const encryptPasswords = async () => {
    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/livetherapy');

        LogInfo('Connected to MongoDB');

        // Obtener todos los usuarios
        const users = await UserModel.find();

        // Iterar sobre los usuarios y encriptar las contraseñas
        for (const user of users) {
            // Verificar si la contraseña ya está encriptada
            if (!user.password.startsWith('$2a$')) { // bcrypt hash strings start with $2a$ or $2b$
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                await user.save();
                LogSuccess(`Password encrypted for user with ID: ${user._id}`);
            } else {
                LogInfo(`Password already encrypted for user with ID: ${user._id}`);
            }
        }

        LogSuccess('All passwords encrypted successfully');
        mongoose.disconnect();
    } catch (error) {
        LogError(`Error encrypting passwords: ${error}`);
        mongoose.disconnect();
    }
};

encryptPasswords();
