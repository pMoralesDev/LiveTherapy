import mongoose from "mongoose";

export interface IAnswer {
    _id: mongoose.Types.ObjectId;
    name: string,
}