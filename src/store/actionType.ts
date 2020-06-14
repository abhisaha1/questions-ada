import { IQuestion, IResultOptions, TypeAnswers } from "./../types";

enum ActionType {
  SET_QUESTION_CURSOR = "SET_QUESTION_CURSOR",
  SET_QUESTIONS = "SET_QUESTIONS",
  SELECT_ANSWER = "SELECT_ANSWER",
  RESULT_CHANGE = "RESULT_CHANGE",
  SET_ANSWERS = "SET_ANSWERS",
  SET_RESULT = "SET_RESULT",
}
export default ActionType;

interface IActionSetQuestions {
  type: ActionType.SET_QUESTIONS;
  payload: {
    questions: IQuestion[];
    cursor: number;
  };
}
interface IActionSetQuestionCursor {
  type: ActionType.SET_QUESTION_CURSOR;
  payload: number;
}
interface IActionAnswerSelect {
  type: ActionType.SELECT_ANSWER;
  payload: {
    cursor: number;
    value: string;
  };
}
interface IActionSetResult {
  type: ActionType.SET_RESULT;
  payload: IResultOptions[];
}

interface IActionSetAnswers {
  type: ActionType.SET_ANSWERS;
  payload: TypeAnswers;
}

export type IAction =
  | IActionSetQuestions
  | IActionSetQuestionCursor
  | IActionAnswerSelect
  | IActionSetResult
  | IActionSetAnswers;
