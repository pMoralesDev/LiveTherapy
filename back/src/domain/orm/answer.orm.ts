import { AnswerModel, LikertAnswerModel, ShortAnswerModel } from '../entities/answer.entity';
import { IAnswerBase, ILikertAnswer, IShortAnswer, AnswerType } from '../interfaces/IAnswer.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';

export const getAnswersORM = async (id?: string): Promise<IAnswerBase[] | IAnswerBase | null> => {
  try {
    if (id) {
      const answer = await AnswerModel.findById(id).exec();
      if (answer) {
        LogSuccess(`[ORM SUCCESS]: Answer found with ID ${id}`);
        return answer;
      } else {
        LogInfo(`[ORM INFO]: No answer found with ID ${id}`);
        return null;
      }
    } else {
      const answers = await AnswerModel.find().exec();
      LogSuccess(`[ORM SUCCESS]: All answers retrieved`);
      return answers;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching answers - ${error}`);
    throw new Error('Error fetching answers');
  }
};

export const createAnswerORM = async (answer: ILikertAnswer | IShortAnswer): Promise<IAnswerBase> => {
  try {
    let newAnswer;
    if (answer.type === AnswerType.LIKERT) {
      newAnswer = new LikertAnswerModel(answer);
    } else if (answer.type === AnswerType.SHORT) {
      newAnswer = new ShortAnswerModel(answer);
    } else {
      throw new Error('Invalid answer type');
    }

    const savedAnswer = await newAnswer.save();
    LogSuccess(`[ORM SUCCESS]: Answer created with ID ${savedAnswer._id}`);
    return savedAnswer;
  } catch (error) {
    LogError(`[ORM ERROR]: Error creating answer - ${error}`);
    throw new Error('Error creating answer');
  }
};
