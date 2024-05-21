import mongoose from 'mongoose';
import { IAnswer } from '../interfaces/IAnswer.interface';

export const answerEntity = () => {
    
    let answerSchema = new mongoose.Schema<IAnswer>(
        {
            name:String
        }
    )

    return mongoose.model('Answer', answerSchema);
}