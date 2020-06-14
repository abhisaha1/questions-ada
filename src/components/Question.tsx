import { Container, QuestionCounter } from "./Question.css";
import React, { ChangeEvent, useEffect, useRef } from "react";

import ActionType from "../store/actionType";
import Option from "./Option";
import { postResultsAPI } from "../api";
import { useGlobalStore } from "../store";
import { useOfflineHook } from "../hooks/useOfflineHook";

interface IProps {}

const Question: React.FC<IProps> = (props) => {
  const [store, dispatch] = useGlobalStore();
  const [, setOfflineData] = useOfflineHook();
  const { cursor, questions, answers } = store;
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      console.log("Setting focus");
      containerRef.current.focus();
    }
  }, [store.cursor]);

  const onAnswerSelected = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SELECT_ANSWER,
      payload: { cursor, value: event.target.value },
    });
  };

  const nextQuestion = () => {
    const nextCursor = cursor + 1;
    if (nextCursor < questions.length) {
      dispatch({
        type: ActionType.SET_QUESTION_CURSOR,
        payload: nextCursor,
      });
      setOfflineData({
        answers: {
          ...store.answers,
        },
        cursor: nextCursor,
      });
    } else {
      postResults();
    }
  };

  const postResults = async () => {
    //@ts-ignore
    const response = await postResultsAPI(Object.values(answers));
    dispatch({
      type: ActionType.SET_RESULT,
      payload: response,
    });
  };

  const renderAnswerOptions = (text: string, index: number) => {
    let tabIndex = -1;
    if (answers[cursor] === text) {
      tabIndex = 0;
    }
    if (!answers[cursor] && index === 0) {
      tabIndex = 0;
    }
    return (
      <Option
        isChecked={answers[cursor] === text}
        answer={text}
        key={text + "-" + store.cursor}
        onAnswerSelected={onAnswerSelected}
        tabIndex={tabIndex}
      />
    );
  };

  return (
    <Container
      ref={containerRef}
      tabIndex={0}
      aria-labelledby={"question-" + store.cursor}
    >
      <div id={"question-" + store.cursor}>
        <QuestionCounter>
          Question <span>{cursor + 1}</span> of <span>{questions.length}</span>
        </QuestionCounter>
        <h2>{questions[cursor].question}</h2>

        <div>{questions[cursor].options.map(renderAnswerOptions)}</div>
      </div>
      {answers[cursor] && <button onClick={nextQuestion}>Next</button>}
    </Container>
  );
};

export default Question;
