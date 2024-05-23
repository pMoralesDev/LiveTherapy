import MessageModel from '../entities/message.entity';
import { IMessage } from '../interfaces/IMessage.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';

export const getMessagesORM = async (id?: string): Promise<IMessage[] | IMessage | null> => {
  try {
    if (id) {
      const message = await MessageModel.findById(id).exec();
      if (message) {
        LogSuccess(`[ORM SUCCESS]: Message found with ID ${id}`);
        return message;
      } else {
        LogInfo(`[ORM INFO]: No message found with ID ${id}`);
        return null;
      }
    } else {
      const messages = await MessageModel.find().exec();
      LogSuccess(`[ORM SUCCESS]: All messages retrieved`);
      return messages;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching messages - ${error}`);
    throw new Error('Error fetching messages');
  }
};

export const createMessageORM = async (message: IMessage): Promise<IMessage> => {
  try {
    const newMessage = new MessageModel(message);
    const savedMessage = await newMessage.save();
    LogSuccess(`[ORM SUCCESS]: Message created with ID ${savedMessage._id}`);
    return savedMessage;
  } catch (error) {
    LogError(`[ORM ERROR]: Error creating message - ${error}`);
    throw new Error('Error creating message');
  }
};

export const updateMessageORM = async (id: string, message: Partial<IMessage>): Promise<IMessage | null> => {
  LogInfo(`[ORM INFO]: Attempting to update message with ID ${id}`);
  LogInfo(`[ORM INFO]: Update data: ${JSON.stringify(message)}`);
  try {
    const updatedMessage = await MessageModel.findByIdAndUpdate(id, message, { new: true }).exec();
    if (updatedMessage) {
      LogSuccess(`[ORM SUCCESS]: Message updated with ID ${id}`);
      return updatedMessage;
    } else {
      LogInfo(`[ORM INFO]: No message found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error updating message - ${error}`);
    throw new Error('Error updating message');
  }
};
