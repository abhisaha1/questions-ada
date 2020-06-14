import { Container, Header } from "./App.css";
import React, { ChangeEvent } from "react";

import ActionType from "./store/actionType";
import Question from "./components/Question";
import Result from "./components/Result";
import { useGlobalStore } from "./store";
import { useInitStore } from "./hooks/useInitStore";

const App: React.FC = () => {
  useInitStore();
  const [store, dispatch] = useGlobalStore();
  const { result } = store;

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

  const renderQuestion = () => {
    if (store.cursor < 0) return null;
    return <Question />;
  };

  const renderResult = () => {
    return <Result result={result} onResultChange={onResultChange} />;
  };
  return (
    <Container>
      <Header>
        <h2>Questionnaire</h2>
      </Header>
      <div aria-live="polite">
        {result.length > 0 ? renderResult() : renderQuestion()}
      </div>
    </Container>
  );
};

export default App;
