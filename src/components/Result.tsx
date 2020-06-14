import { Container, RadioOption } from "./Option.css";
import React, { ChangeEvent, useEffect, useState } from "react";

import { IResultOptions } from "../types";
import { sendresult } from "../api";
import { useGlobalStore } from "../store";
import { useOfflineHook } from "../hooks/useOfflineHook";

interface IProps {
  result: IResultOptions[];
  onResultChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Result: React.FC<IProps> = ({ result, onResultChange }) => {
  const [store] = useGlobalStore();
  const [, , clearOffline] = useOfflineHook();
  const [done, setDone] = useState(false);

  // delete offline data
  useEffect(() => {
    clearOffline();
  }, []);
  const resultList = result.map((item) => {
    return (
      <Container key={item.severity}>
        <RadioOption>
          <input
            tabIndex={item.selected ? 0 : -1}
            type="radio"
            name="radioGroup"
            checked={item.selected}
            id={item.severity}
            value={item.severity}
            onChange={onResultChange}
          />
          <label className="radioCustomLabel" htmlFor={item.severity}>
            {item.name} - {item.severity}{" "}
            {item.recommended ? "(suggested)" : ""}
          </label>
          <p>{item.description}</p>
        </RadioOption>
      </Container>
    );
  });

  const submitResult = async () => {
    const ok = await sendresult(store.result);
    if (ok) {
      setDone(true);
    }
  };

  if (done) {
    return <span>Your selection has been saved successfully.</span>;
  }

  return (
    <>
      {resultList}
      <button onClick={submitResult}>Submit Data</button>
    </>
  );
};

export default Result;
