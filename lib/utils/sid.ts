import {
  MAXIMUM_NUM,
  MINIMUM_NUM,
  NUMERIC_LENGTH,
  VALID_PREFIX,
} from "../constants/sid";

type SIdPrefix = (typeof VALID_PREFIX)[number];

export const padNumericId = (num: number): string => {
  return num.toString().padStart(NUMERIC_LENGTH, "0");
};

export const generateNumericId = (): number => {
  return (
    Math.floor(Math.random() * (MAXIMUM_NUM - MINIMUM_NUM + 1)) + MINIMUM_NUM
  );
};

export const generateSId = (prefix: SIdPrefix): string => {
  const id = generateNumericId();
  const paddedId = padNumericId(id);
  return `${prefix}-${paddedId}`;
};
