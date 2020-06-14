export interface IGlobalState {
  questions: IQuestion[];
  answers: TypeAnswers;
  result: IResultOptions[];
  cursor: number;
}

export type TypeAnswers = { [question: number]: string };

export interface IQuestion {
  question: string;
  options: TypeOptions;
}

export type TypeOptions = string[];

export enum EnumSeverity {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}
export interface IResultOptions {
  name: string;
  severity: EnumSeverity;
  description: string;
  recommended?: boolean;
  selected?: boolean;
}

export interface IOfflineData {
  answers: TypeAnswers;
  cursor: number;
}
