import mongoose from "mongoose";

export interface ICuestionario {
    _id: mongoose.Types.ObjectId;
    name: string,
}