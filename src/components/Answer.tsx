import React, { ChangeEvent } from "react";

import Option from "./Option";
import { TypeOptions } from "../types";

interface IProps {
  options: TypeOptions;
  selectedAnswer: string | null;
  onAnswerSelected: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Answer: React.FC<IProps> = ({
  options,
  selectedAnswer,
  onAnswerSelected,
}) => {
  return (
    <div>
      {options.map((text: string, index: number) => {
        let tabIndex = -1;
        if (selectedAnswer === text) {
          tabIndex = 0;
        }
        if (!selectedAnswer && index === 0) {
          tabIndex = 0;
        }
        return (
          <Option
            isChecked={selectedAnswer === text}
            answer={text}
            key={text}
            onAnswerSelected={onAnswerSelected}
            tabIndex={tabIndex}
          />
        );
      })}
    </div>
  );
};

export default Answer;
