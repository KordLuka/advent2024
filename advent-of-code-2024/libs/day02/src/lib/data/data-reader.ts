export const readInputData = (fileContent: string): number[][] =>
  fileContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => line.split(/\s+/).map(Number));
