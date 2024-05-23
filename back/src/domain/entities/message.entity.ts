import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from '../interfaces/IMessage.interface';

const messageSchema: Schema<IMessage> = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.models.Messages || mongoose.model<IMessage>('Messages', messageSchema);

export default MessageModel;
