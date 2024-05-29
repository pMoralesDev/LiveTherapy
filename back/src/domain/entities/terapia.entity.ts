import mongoose, { Schema, Document } from 'mongoose';
import { ITerapia } from '../interfaces/ITerapia.interface';

const terapiaSchema: Schema<ITerapia> = new Schema(
  {
    idTerapeuta: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    idPaciente: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    citas: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Citas'
      }],
      default: [], 
      required: false 
    },
    registros: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuestionarios'
      }],
      default: [],
      required: false 
    },
    chat: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
      }],
      default: [],
      required: false 
    },
  },
  {
    timestamps: true,
  }
);

const TerapiaModel = mongoose.models.Terapias || mongoose.model<ITerapia>('Terapias', terapiaSchema);

export default TerapiaModel;
