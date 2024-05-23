import { Get, Post, Put, Body, Query, Route, Tags } from 'tsoa';

import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { createMessageORM, getMessagesORM, updateMessageORM } from '@/domain/orm/message.orm';
import { IMessage } from '@/domain/interfaces/IMessage.interface';
import { IMessageController } from './interfaces';


@Route('/api/messages')
@Tags('MessageController')
export class MessageController implements IMessageController {
  @Get('/')
  public async getMessages(@Query() id?: string): Promise<IMessage | IMessage[]> {
    try {
      const result = await getMessagesORM(id);
      if (id && result) {
        LogSuccess(`[/api/messages] Request for message data with ID: ${id}`);
        return result as IMessage;
      } else {
        LogSuccess(`[/api/messages] Request for all message data`);
        return result as IMessage[];
      }
    } catch (error) {
      LogError(`[/api/messages] Error fetching messages: ${error}`);
      throw new Error('Error fetching messages');
    }
  }

  @Post('/')
  public async createMessage(@Body() message: IMessage): Promise<IMessage> {
    try {
      const newMessage = await createMessageORM(message);
      LogSuccess(`[/api/messages] Message created with ID: ${newMessage._id}`);
      return newMessage;
    } catch (error) {
      LogError(`[/api/messages] Error creating message: ${error}`);
      throw new Error('Error creating message');
    }
  }

  @Put('/')
  public async updateMessage(@Query() id: string, @Body() message: Partial<IMessage>): Promise<IMessage | null> {
    LogInfo(`[/api/messages] Attempting to update message with ID: ${id}`);
    try {
      const updatedMessage = await updateMessageORM(id, message);
      if (updatedMessage) {
        LogSuccess(`[/api/messages] Message updated with ID: ${updatedMessage._id}`);
        return updatedMessage;
      } else {
        LogInfo(`[/api/messages] No message found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/messages] Error updating message: ${error}`);
      throw new Error('Error updating message');
    }
  }
}
