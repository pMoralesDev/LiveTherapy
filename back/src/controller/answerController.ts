import { Get, Post, Body, Query, Route, Tags } from 'tsoa';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { getAnswersORM, createAnswerORM } from '../domain/orm/answer.orm';
import { IAnswerController } from './interfaces';
import { IAnswerBase, ILikertAnswer, IShortAnswer } from '@/domain/interfaces/IAnswer.interface';


@Route('/api/answers')
@Tags('AnswerController')
export class AnswerController implements IAnswerController {
  @Get('/')
  public async getAnswers(@Query() id?: string): Promise<IAnswerBase | IAnswerBase[]> {
    try {
      const result = await getAnswersORM(id);
      if (id && result) {
        LogSuccess(`[/api/answers] Request for answer data with ID: ${id}`);
        return result as IAnswerBase;
      } else {
        LogSuccess(`[/api/answers] Request for all answer data`);
        return result as IAnswerBase[];
      }
    } catch (error) {
      LogError(`[/api/answers] Error fetching answers: ${error}`);
      throw new Error('Error fetching answers');
    }
  }

  @Post('/')
  public async createAnswer(@Body() answer: ILikertAnswer | IShortAnswer): Promise<IAnswerBase> {
    try {
      const newAnswer = await createAnswerORM(answer);
      LogSuccess(`[/api/answers] Answer created with ID: ${newAnswer._id}`);
      return newAnswer;
    } catch (error) {
      LogError(`[/api/answers] Error creating answer: ${error}`);
      throw new Error('Error creating answer');
    }
  }
}
