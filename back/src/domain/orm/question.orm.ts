import { IQuestion } from "../interfaces/IQuestion.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import QuestionModel from "../entities/question.entity";


export const getQuestionsORM = async (id?: string): Promise<IQuestion[] | IQuestion | null> => {
  try {
    if (id) {
      const question = await QuestionModel.findById(id).exec();
      if (question) {
        LogSuccess(`[ORM SUCCESS]: Question found with ID ${id}`);
        return question;
      } else {
        LogInfo(`[ORM INFO]: No question found with ID ${id}`);
        return null;
      }
    } else {
      const questions = await QuestionModel.find().exec();
      LogSuccess(`[ORM SUCCESS]: All questions retrieved`);
      return questions;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching questions - ${error}`);
    throw new Error('Error fetching questions');
  }
};

export const createQuestionORM = async (question: IQuestion): Promise<IQuestion> => {
  try {
    const newQuestion = new QuestionModel(question);
    const savedQuestion = await newQuestion.save();
    LogSuccess(`[ORM SUCCESS]: Question created with ID ${savedQuestion._id}`);
    return savedQuestion;
  } catch (error) {
    LogError(`[ORM ERROR]: Error creating question - ${error}`);
    throw new Error('Error creating question');
  }
};

export const updateQuestionORM = async (id: string, question: Partial<IQuestion>): Promise<IQuestion | null> => {
  LogInfo(`[ORM INFO]: Attempting to update question with ID ${id}`);
  LogInfo(`[ORM INFO]: Update data: ${JSON.stringify(question)}`);
  try {
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, question, { new: true }).exec();
    if (updatedQuestion) {
      LogSuccess(`[ORM SUCCESS]: Question updated with ID ${id}`);
      return updatedQuestion;
    } else {
      LogInfo(`[ORM INFO]: No question found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error updating question - ${error}`);
    throw new Error('Error updating question');
  }
};

export const deleteQuestionORM = async (id: string): Promise<IQuestion | null> => {
  LogInfo(`[ORM INFO]: Attempting to delete question with ID ${id}`);
  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(id).exec();
    if (deletedQuestion) {
      LogSuccess(`[ORM SUCCESS]: Question deleted with ID ${id}`);
      return deletedQuestion;
    } else {
      LogInfo(`[ORM INFO]: No question found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error deleting question - ${error}`);
    throw new Error('Error deleting question');
  }
};
