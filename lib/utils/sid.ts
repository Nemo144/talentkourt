import { MAXIMUM_NUM, MINIMUM_NUM, NUMERIC_LENGTH } from "../constants/sid";

export const padNumericId = (num: number): string => {
  return num.toString().padStart(NUMERIC_LENGTH, "0");
};

export const generateNumericId = (): number => {
  return (
    Math.floor(Math.random() * (MAXIMUM_NUM - MINIMUM_NUM + 1)) + MINIMUM_NUM
  );
};
