import mongoose from "mongoose";

export enum cuestionarioTipo {
    AUTOINFORME = 'autoinforme',
    COMPETENCIAS = 'competnecias',
    ACTITUDES = 'actitudes',
    CONDUCTUAL = "conductual",
}

export interface ICuestionario extends Document {
    _id?: mongoose.Types.ObjectId;
    name: string;
    modelo: boolean;
    tipo: cuestionarioTipo;
    preguntas: mongoose.Types.ObjectId[];
    respuestas: mongoose.Types.ObjectId[];
}