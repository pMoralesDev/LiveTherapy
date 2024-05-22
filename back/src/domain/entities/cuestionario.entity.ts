import mongoose from 'mongoose';
import { ICuestionario } from '../interfaces/ICuestionario.interface';

export const cuestionarioEntity = () => {
    
    let cuestionarioSchema = new mongoose.Schema<ICuestionario>(
        {
            name:String
        }
    )

    return mongoose.models.Cuestionarios || mongoose.model('Cuestionarios', cuestionarioSchema);
}