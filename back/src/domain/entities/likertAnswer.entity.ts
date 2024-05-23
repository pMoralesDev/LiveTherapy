import mongoose, { Schema, Document } from 'mongoose';
import AnswerModel from './answer.entity';
import { IAnswer } from '../interfaces/IAnswer.interface';

interface ILikertAnswer extends IAnswer {
  value: number;
}

const likertAnswerSchema: Schema<ILikertAnswer & Document> = new Schema(
  {
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  }
);

const LikertAnswerModel = AnswerModel.discriminator<ILikertAnswer & Document>('likert', likertAnswerSchema);

export default LikertAnswerModel;