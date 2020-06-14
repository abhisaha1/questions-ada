import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

import { IAction } from "./actionType";
import { IGlobalState } from "../types";
import { reducer } from "./reducer";

interface StoreProviderProps {
  children: ReactNode;
}

const initialState: IGlobalState = {
  questions: [],
  result: [],
  answers: {},
  cursor: -1,
};

export const GlobalStateContext = createContext<
  [IGlobalState, Dispatch<IAction>]
>([initialState, () => {}]);

export function StoreProvider(props: StoreProviderProps) {
  // make globalState and dispatch available to all components
  const value = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={value}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}

export const useGlobalStore = (): [IGlobalState, Dispatch<IAction>] => {
  return useContext(GlobalStateContext);
};
