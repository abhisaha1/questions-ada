import { Container, RadioOption } from "./Option.css";
import React, { ChangeEvent } from "react";

interface AnswerOption {
  answer: string;
  isChecked: boolean;
  onAnswerSelected: (e: ChangeEvent<HTMLInputElement>) => void;
  tabIndex: number;
}

const Option: React.FC<AnswerOption> = (props) => {
  return (
    <Container>
      <RadioOption>
        <input
          tabIndex={props.tabIndex}
          type="radio"
          name="radioGroup"
          checked={props.isChecked}
          id={props.answer}
          value={props.answer}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answer}>
          {props.answer}
        </label>
      </RadioOption>
    </Container>
  );
};

export default Option;
