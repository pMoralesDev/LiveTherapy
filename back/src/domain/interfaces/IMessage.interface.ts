import mongoose from "mongoose";

export interface IMessage extends Document {
    _id?: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
  }