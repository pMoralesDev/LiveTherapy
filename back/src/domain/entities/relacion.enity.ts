import mongoose from 'mongoose';
import { IRelacion } from '../interfaces/IRelacion.interface';

export const relacionEntity = () => {
    
    let relacionSchema = new mongoose.Schema<IRelacion>(
        {
            name:String
        }
    )

    return mongoose.models.Relacion || mongoose.model('Relacion', relacionSchema);
}