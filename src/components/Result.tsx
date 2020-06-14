import { Container, RadioOption } from "./Option.css";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const selected = containerRef.current.querySelector(
        '[tabindex="0"]',
      ) as HTMLLabelElement;
      if (selected) selected.focus();
    }
  }, [done]);

  // delete offline data
  useEffect(() => {
    clearOffline();
  }, []);
  const resultList = result.map((item) => {
    return (
      <RadioOption key={item.severity}>
        <input
          tabIndex={item.selected ? 0 : -1}
          type="radio"
          name="radioGroup"
          checked={item.selected}
          id={item.severity}
          value={item.severity}
          onChange={onResultChange}
        />
        <label htmlFor={item.severity}>
          {item.name} - {item.severity} {item.recommended ? "(suggested)" : ""}
        </label>
        <p>{item.description}</p>
      </RadioOption>
    );
  });

  const submitResult = async () => {
    const ok = await sendresult(store.result);
    if (ok) {
      setDone(true);
    }
  };

  if (done) {
    return <div>Your selection has been saved successfully.</div>;
  }

  return (
    <div ref={containerRef} tabIndex={0}>
      {resultList}
      <button onClick={submitResult}>Submit Data</button>
    </div>
  );
};

export default Result;
