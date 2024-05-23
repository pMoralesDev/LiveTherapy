import mongoose, { Schema, Document } from 'mongoose';
import { AnswerType, IAnswerBase, ILikertAnswer, IShortAnswer } from '../interfaces/IAnswer.interface';

const answerBaseSchema: Schema<IAnswerBase> = new Schema(
  {
    idPregunta: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Questions'
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(AnswerType)
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'type' // This field is used to differentiate the answer types
  }
);

const AnswerModel = mongoose.models.Answers || mongoose.model<IAnswerBase>('Answers', answerBaseSchema);

const LikertAnswerModel = AnswerModel.discriminator<ILikertAnswer>(
  AnswerType.LIKERT,
  new Schema({
    respuesta: {
      type: Number,
      required: true
    }
  })
);

const ShortAnswerModel = AnswerModel.discriminator<IShortAnswer>(
  AnswerType.SHORT,
  new Schema({
    respuesta: {
      type: String,
      required: true
    }
  })
);

export { AnswerModel, LikertAnswerModel, ShortAnswerModel };
