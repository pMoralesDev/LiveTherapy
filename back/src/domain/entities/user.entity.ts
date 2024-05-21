import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser.interface';

export const userEntity = () => {
    
    let userSchema = new mongoose.Schema<IUser>(
        {
            rol: {type: String, required: true},
            name: {type: String, required: true},
            email: {type: String, required: true},
            password: {type: String, required: true},
            age: {type: Number, required: true},
            phone: {type: String, required: true},
        }
    )

    return mongoose.model('Users', userSchema);
}