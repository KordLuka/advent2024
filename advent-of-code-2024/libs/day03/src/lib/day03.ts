import * as fs from 'fs';
import { readInputData } from './data/data-reader';

const MUL_SUFFIX = ')';
const MUL_PREFIX = 'mul(';
const ENABLED_INSTRUCTION_PREFIX = 'do()';
const DISABLED_INSTRUCTION_PREFIX = `don't()`;

const extractNumbers = (instruction: string): number[] => {
  const start = instruction.indexOf('(');
  const end = instruction.indexOf(MUL_SUFFIX);

  if (start === -1 || end === -1 || start >= end) return [];

  const numbersString = instruction.substring(start + 1, end);
  const numbers = numbersString.split(',').map(Number);

  return numbers.every((num) => !isNaN(num)) ? numbers : [];
};

const isTwoNumbers = (instruction: string): boolean =>
  extractNumbers(instruction).length === 2;

const multiplyInstruction = (instruction: string): number => {
  const [number1, number2] = extractNumbers(instruction);
  return number1 * number2;
};

const getMulInstructions = (instruction: string): string[] => {
  return instruction
    .split(MUL_PREFIX)
    .slice(1)
    .map((part) => MUL_PREFIX + part)
    .filter((part) => part.includes(MUL_SUFFIX));
};

const getInstructionWithoutDisabledParts = (data: string): string => {
  let reducedInstruction = '';
  let currentIndex = 0;

  while (currentIndex < data.length) {
    const startIndex = data.indexOf(DISABLED_INSTRUCTION_PREFIX, currentIndex);

    reducedInstruction += data.slice(currentIndex, startIndex);

    const endIndex = data.indexOf(
      ENABLED_INSTRUCTION_PREFIX,
      startIndex + DISABLED_INSTRUCTION_PREFIX.length
    );

    if (endIndex === -1) {
      break;
    }

    currentIndex = endIndex + ENABLED_INSTRUCTION_PREFIX.length;
  }

  return reducedInstruction;
};

export const day03_1 = () => {
  const data = readInputData(fs.readFileSync('./data/data.txt', 'utf-8'));

  const result = getMulInstructions(data)
    .filter(isTwoNumbers)
    .map(multiplyInstruction)
    .reduce((sum, result) => sum + result, 0);

  return result;
};

export const day03_2 = () => {
  const data = readInputData(fs.readFileSync('./data/data_2.txt', 'utf-8'));

  const result = getMulInstructions(getInstructionWithoutDisabledParts(data))
    .filter(isTwoNumbers)
    .map(multiplyInstruction)
    .reduce((sum, result) => sum + result, 0);

  return result;
};

console.log('***** REGEX');
console.log('result: ', day03_1());
console.log('result: ', day03_2());
