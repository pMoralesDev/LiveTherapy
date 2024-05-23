import { Get, Post, Put, Delete, Body, Query, Route, Tags } from 'tsoa';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { IQuestionController } from './interfaces';
import { IQuestion } from '@/domain/interfaces/IQuestion.interface';
import { createQuestionORM, deleteQuestionORM, getQuestionsORM, updateQuestionORM } from '@/domain/orm/question.orm';


@Route('/api/questions')
@Tags('QuestionController')
export class QuestionController implements IQuestionController {
  @Get('/')
  public async getQuestions(@Query() id?: string): Promise<IQuestion | IQuestion[]> {
    try {
      const result = await getQuestionsORM(id);
      if (id && result) {
        LogSuccess(`[/api/questions] Request for question data with ID: ${id}`);
        return result as IQuestion;
      } else {
        LogSuccess(`[/api/questions] Request for all question data`);
        return result as IQuestion[];
      }
    } catch (error) {
      LogError(`[/api/questions] Error fetching questions: ${error}`);
      throw new Error('Error fetching questions');
    }
  }

  @Post('/')
  public async createQuestion(@Body() question: IQuestion): Promise<IQuestion> {
    try {
      const newQuestion = await createQuestionORM(question);
      LogSuccess(`[/api/questions] Question created with ID: ${newQuestion._id}`);
      return newQuestion;
    } catch (error) {
      LogError(`[/api/questions] Error creating question: ${error}`);
      throw new Error('Error creating question');
    }
  }

  @Put('/')
  public async updateQuestion(@Query() id: string, @Body() question: Partial<IQuestion>): Promise<IQuestion | null> {
    LogInfo(`[/api/questions] Attempting to update question with ID: ${id}`);
    try {
      const updatedQuestion = await updateQuestionORM(id, question);
      if (updatedQuestion) {
        LogSuccess(`[/api/questions] Question updated with ID: ${updatedQuestion._id}`);
        return updatedQuestion;
      } else {
        LogInfo(`[/api/questions] No question found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/questions] Error updating question: ${error}`);
      throw new Error('Error updating question');
    }
  }

  @Delete('/')
  public async deleteQuestion(@Query() id: string): Promise<IQuestion | null> {
    LogInfo(`[/api/questions] Attempting to delete question with ID: ${id}`);
    try {
      const deletedQuestion = await deleteQuestionORM(id);
      if (deletedQuestion) {
        LogSuccess(`[/api/questions] Question deleted with ID: ${deletedQuestion._id}`);
        return deletedQuestion;
      } else {
        LogInfo(`[/api/questions] No question found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/questions] Error deleting question: ${error}`);
      throw new Error('Error deleting question');
    }
  }
}
