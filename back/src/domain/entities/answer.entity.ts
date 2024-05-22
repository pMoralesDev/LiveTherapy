import mongoose from 'mongoose';
import { IAnswer } from '../interfaces/IAnswer.interface';

export const answerEntity = () => {
    
    let answerSchema = new mongoose.Schema<IAnswer>(
        {
            name: {type: String, required: true},
            text: {type: String, required: true},
            tipo: {type: String, required: true},
        }
    )

    return mongoose.models.Answer || mongoose.model('Answer', answerSchema);
}