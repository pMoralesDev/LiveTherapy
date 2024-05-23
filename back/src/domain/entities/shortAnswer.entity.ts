import mongoose, { Schema, Document } from 'mongoose';
import AnswerModel from './answer.entity';
import { IAnswer } from '../interfaces/IAnswer.interface';

interface IShortAnswer extends IAnswer {
  response: string;
}

const shortAnswerSchema: Schema<IShortAnswer & Document> = new Schema(
  {
    response: {
      type: String,
      required: true
    }
  }
);

const ShortAnswerModel = AnswerModel.discriminator<IShortAnswer & Document>('short', shortAnswerSchema);

export default ShortAnswerModel;