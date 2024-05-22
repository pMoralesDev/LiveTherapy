import mongoose from 'mongoose';
import { IQuestion } from '../interfaces/IQuestion.interface';

export const questionEntity = () => {
    
    let questionSchema = new mongoose.Schema<IQuestion>(
        {
            name:String
        }
    )

    return mongoose.models.Question || mongoose.model('Question', questionSchema);
}