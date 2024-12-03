import * as fs from 'fs';
import { readInputData } from './data/data-reader';

const getDirection = (row: number[]): 'asc' | 'desc' | null => {
  if (row.length < 2) return null;

  const diff = row[1] - row[0];

  if (diff > 0) return 'asc';
  if (diff < 0) return 'desc';

  return null;
};

const isSafeRow = (row: number[]): boolean => {
  const direction = getDirection(row);

  return row.every((value, index) => {
    if (index === 0) return true;

    const diff = value - row[index - 1];
    const isIncreasing = direction === 'asc' && diff > 0;
    const isDecreasing = direction === 'desc' && diff < 0;

    return (
      Math.abs(diff) <= 3 &&
      value !== row[index - 1] &&
      (isIncreasing || isDecreasing)
    );
  });
};

const isSafeRowWithDampenerProblem = (row: number[]): boolean => {
  return row
    .map((_, index) =>
      isSafeRow([...row.slice(0, index), ...row.slice(index + 1)])
    )
    .includes(true);
};

export const day02_1 = () => {
  const data = readInputData(fs.readFileSync('./data/data.txt', 'utf-8'));

  return data.reduce((count, row) => (isSafeRow(row) ? count + 1 : count), 0);
};

export const day02_2 = () => {
  const data = readInputData(fs.readFileSync('./data/data.txt', 'utf-8'));

  return data.reduce(
    (count, row) =>
      isSafeRow(row) || isSafeRowWithDampenerProblem(row) ? count + 1 : count,
    0
  );
};

console.log('result: ', day02_1());
console.log('result: ', day02_2());
