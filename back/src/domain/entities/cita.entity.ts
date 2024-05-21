import mongoose from 'mongoose';
import { ICita } from '../interfaces/ICita.interface';

export const citaEntity = () => {
    
    let citaSchema = new mongoose.Schema<ICita>(
        {
            name:String
        }
    )

    return mongoose.model('Cita', citaSchema);
}