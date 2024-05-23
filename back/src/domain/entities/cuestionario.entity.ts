import mongoose, { Schema, Document } from 'mongoose';
import { ICuestionario, cuestionarioTipo } from '../interfaces/ICuestionario.interface';

const cuestionarioSchema: Schema<ICuestionario> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    modelo: {
      type: Boolean,
      required: true
    },
    tipo: {
      type: String,
      required: true,
      enum: Object.values(cuestionarioTipo),
    },
    preguntas: [{
      type: Schema.Types.ObjectId,
      ref: 'Questions',
    }],
    respuestas: [{
      type: Schema.Types.ObjectId,
      ref: 'Answers'
    }]
  },
  {
    timestamps: true,
  }
);

const CuestionarioModel = mongoose.models.Cuestionarios || mongoose.model<ICuestionario>('Cuestionarios', cuestionarioSchema);

export default CuestionarioModel;