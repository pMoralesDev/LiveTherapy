import mongoose from "mongoose";

export interface ICita {
    _id: mongoose.Types.ObjectId;
    name: string,
}