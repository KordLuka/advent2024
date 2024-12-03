export const readInputData = (fileContent: string): [number[], number[]] => {
  const [list1, list2] = fileContent.split('\n').reduce(
    ([list1, list2]: [number[], number[]], line) => {
      const [num1, num2] = line.trim().split(/\s+/).map(Number);
      if (!isNaN(num1) && !isNaN(num2)) {
        list1.push(Number(num1));
        list2.push(Number(num2));
      }
      return [list1, list2];
    },
    [[], []]
  );

  return [list1, list2];
};
