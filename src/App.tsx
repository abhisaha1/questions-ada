import { Container, Header } from "./App.css";
import React, { ChangeEvent, useEffect } from "react";

import ActionType from "./store/actionType";
import Question from "./components/Question";
import Result from "./components/Result";
import { fetchQuestions } from "./api";
import { useGlobalStore } from "./store";
import { useOfflineHook } from "./hooks/useOfflineHook";

const App: React.FC = () => {
  const [store, dispatch] = useGlobalStore();
  const [offlineData] = useOfflineHook();
  const { result } = store;

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

  const onResultChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newResult = result.map((item) => {
      item.selected = false;
      if (event.target.value === item.severity) {
        item.selected = true;
      }
      return item;
    });
    dispatch({
      type: ActionType.SET_RESULT,
      payload: newResult,
    });
  };

  const renderQuiz = () => {
    if (store.cursor < 0) return null;
    return <Question />;
  };

  const renderResult = () => {
    return <Result result={result} onResultChange={onResultChange} />;
  };
  return (
    <Container>
      <Header>
        <h2>Questionaire</h2>
      </Header>
      {result.length > 0 ? renderResult() : renderQuiz()}
    </Container>
  );
};

export default App;
