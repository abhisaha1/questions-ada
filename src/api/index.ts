import { EnumSeverity, IQuestion, IResultOptions } from "./../types";

export const fetchQuestions = (): Promise<IQuestion[]> => {
  const data = [
    {
      question: "I have previously put money in a risky investment",
      options: [
        "Strongly Agree",
        "Agree",
        "Neither Agree nor Disagree",
        "Disagree",
        "Strongly Disagree",
      ],
    },
    {
      question: "I prefer my money to be safe from risk",
      options: [
        "Strongly Agree",
        "Agree",
        "Neither Agree nor Disagree",
        "Disagree",
        "Strongly Disagree",
      ],
    },
    {
      question: "You friends would say that you are cautious",
      options: [
        "Strongly Agree",
        "Agree",
        "Neither Agree nor Disagree",
        "Disagree",
        "Strongly Disagree",
      ],
    },
  ];
  console.log("data :>> ", data);
  return Promise.resolve(data);
};

const resultOptions: IResultOptions[] = [
  {
    name: "Risk Level 1",
    severity: EnumSeverity.Low,
    description:
      "A conservative set of investing to result in slow growth culture",
  },
  {
    name: "Risk Level 2",
    severity: EnumSeverity.Medium,
    description: "A mix of investments to result in average growth over time",
  },
  {
    name: "Risk Level 3",
    severity: EnumSeverity.High,
    description: "Stocks only. No bonds or cash",
  },
];

export const postResultsAPI = (
  answers: string[],
): Promise<IResultOptions[]> => {
  // console.log(answers);
  const backendAnswer = "Risk Level 3";
  const response = resultOptions.map((option) => {
    option.recommended = false;
    if (option.name === backendAnswer) {
      option.recommended = true;
      option.selected = true;
    }
    return option;
  });

  return Promise.resolve(response);
};

export const sendresult = (data: IResultOptions) => {
  console.log("Send result to backend");

  return Promise.resolve(true);
};
