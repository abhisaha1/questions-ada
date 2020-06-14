import ActionType, { IAction } from "./actionType";

import { IGlobalState } from "types";

export const reducer: React.Reducer<IGlobalState, IAction> = (
  state,
  action,
): IGlobalState => {
  switch (action.type) {
    default:
      return state;
  }
};
