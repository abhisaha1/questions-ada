import { useEffect, useState } from "react";

import ActionType from "../store/actionType";
import { fetchQuestions } from "./../api/index";
import { useGlobalStore } from "./../store/index";
import { useOfflineHook } from "./useOfflineHook";

type TypeProps = [];

export const useInitStore = (): TypeProps => {
  const [offlineData] = useOfflineHook();
  const [store, dispatch] = useGlobalStore();

  useEffect(() => {
    fetchQuestions().then((questions) => {
      dispatch({
        type: ActionType.SET_QUESTIONS,
        payload: {
          questions,
          cursor: offlineData ? offlineData.cursor : 0,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (offlineData) {
      dispatch({
        type: ActionType.SET_ANSWERS,
        payload: offlineData.answers,
      });
      dispatch({
        type: ActionType.SET_QUESTION_CURSOR,
        payload: offlineData.cursor,
      });
    }
  }, [store.questions.length]);

  return [];
};
