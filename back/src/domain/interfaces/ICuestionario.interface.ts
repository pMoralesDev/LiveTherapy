import mongoose from "mongoose";

export enum cuestionarioTipo {
    AUTOINFORME = 'autoinforme',
    COMPETENCIAS = 'conpetnecias',
    ACTITUDES = 'actitudes',
    CONDUCTUAL = "conductual",
}

export interface ICuestionario extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    tipo: cuestionarioTipo;
    preguntas: mongoose.Types.ObjectId[];
}