import mongoose from "mongoose";

export interface IQuestion {
    _id: mongoose.Types.ObjectId;
    name: string,
}