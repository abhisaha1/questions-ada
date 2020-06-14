import ActionType, { IAction } from "./actionType";

import { IGlobalState } from "types";

export const reducer: React.Reducer<IGlobalState, IAction> = (
  state,
  action,
): IGlobalState => {
  switch (action.type) {
    case ActionType.SET_QUESTIONS: {
      const { cursor, questions } = action.payload;
      return { ...state, questions, cursor };
    }

    case ActionType.SELECT_ANSWER: {
      const { cursor, value } = action.payload;
      return {
        ...state,
        answers: {
          ...state.answers,
          [cursor]: value,
        },
      };
    }

    case ActionType.SET_ANSWERS: {
      return {
        ...state,
        answers: { ...action.payload },
      };
    }

    case ActionType.SET_QUESTION_CURSOR: {
      return {
        ...state,
        cursor: action.payload,
      };
    }

    case ActionType.SET_RESULT: {
      return {
        ...state,
        result: action.payload,
      };
    }

    default:
      return state;
  }
};
