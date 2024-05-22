import mongoose from 'mongoose';
import { ITerapia } from '../interfaces/ITerapia.interface';

export const registroEntity = () => {
    
    let registroSchema = new mongoose.Schema<ITerapia>(
        {
            
        }
    )

    return mongoose.models.Terapias || mongoose.model('Terapias', registroSchema);
}