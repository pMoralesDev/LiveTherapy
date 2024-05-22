import mongoose from 'mongoose';
import { IRegistro } from '../interfaces/IRegistro.interface';

export const relacionEntity = () => {
    
    let relacionSchema = new mongoose.Schema<IRegistro>(
        {
            name:String
        }
    )

    return mongoose.models.Registros || mongoose.model('Registros', relacionSchema);
}