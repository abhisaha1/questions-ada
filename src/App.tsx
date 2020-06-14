import { Container, Header } from "./App.css";
import React, { useEffect } from "react";

import ActionType from "./store/actionType";
import { fetchQuestions } from "./api";
import { useGlobalStore } from "./store";
import { useOfflineHook } from "./hooks/useOfflineHook";

const App: React.FC = () => {
  const [store, dispatch] = useGlobalStore();
  const [offlineData] = useOfflineHook();

  useEffect(() => {
    fetchQuestions().then((questions) => {
      dispatch({
        type: ActionType.SET_QUESTIONS,
        payload: questions,
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

  return (
    <Container>
      <Header>
        <h2>Questionaire</h2>
      </Header>
    </Container>
  );
};

export default App;
