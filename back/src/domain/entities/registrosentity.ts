import mongoose from 'mongoose';
import { IRegistro } from '../interfaces/IRegistro.interface';

export const registroEntity = () => {
    
    let registroSchema = new mongoose.Schema<IRegistro>(
        {
            name:String
        }
    )

    return mongoose.models.Registro || mongoose.model('Registro', registroSchema);
}