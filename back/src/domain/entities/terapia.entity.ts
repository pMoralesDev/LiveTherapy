import mongoose, { Schema, Document } from 'mongoose';
import { ITerapia } from '../interfaces/ITerapia.interface';

const terapiaSchema: Schema<ITerapia> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
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
    citas: [{
      type: Schema.Types.ObjectId,
      ref: 'Citas'
    }],
    registros: [{
      type: Schema.Types.ObjectId,
      ref: 'Cuestionarios'
    }],
    chat: [{
      type: Schema.Types.ObjectId,
      ref: 'Messages'
    }]
  },
  {
    timestamps: true,
  }
);

const TerapiaModel = mongoose.models.Terapias || mongoose.model<ITerapia>('Terapias', terapiaSchema);

export default TerapiaModel;
