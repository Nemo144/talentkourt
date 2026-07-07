import {
  MAXIMUM_NUM,
  MINIMUM_NUM,
  NUMERIC_LENGTH,
  VALID_PREFIX,
} from "../constants/TId";

//define type for the prefix
type TIdPrefix = (typeof VALID_PREFIX)[number];

//converts num to a zero-padded string
export const padNumericId = (num: number): string => {
  return num.toString().padStart(NUMERIC_LENGTH, "0");
};

//generate random number within the valid TId range
export const generateNumericId = (): number => {
  return (
    Math.floor(Math.random() * (MAXIMUM_NUM - MINIMUM_NUM + 1)) + MINIMUM_NUM
  );
};

//generate concatenated TId eg "ATH-0011"
export const generateTId = (prefix: TIdPrefix): string => {
  const id = generateNumericId();
  const paddedId = padNumericId(id);
  return `${prefix}-${paddedId}`;
};
