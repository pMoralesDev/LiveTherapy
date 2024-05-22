import mongoose from 'mongoose';
import { ICita } from '../interfaces/ICita.interface';

export const citaEntity = () => {
    
    let citaSchema = new mongoose.Schema<ICita>(
        {
            date: {type: Date, required: true},
            acude: {type: Boolean, required: true},
            informe: {type: String, required: true},
        }
    )

    return mongoose.models.Cita || mongoose.model('Cita', citaSchema);
}