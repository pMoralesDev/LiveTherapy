import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../interfaces/IMessage.interface';

export const messageEntity = () => {
    
    let messageSchema = new mongoose.Schema<IMessage>(
        {
            senderId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
            receiverId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        }
    )

    return mongoose.models.Messages || mongoose.model('Messages', messageSchema);
}