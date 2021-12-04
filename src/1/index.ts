import { readInput } from "../utils.js";

function part1(inputs: string[]): void {
  const amountIncremented = inputs.reduce(
    (incremented, inputRow, currentIndex) => {
      if (currentIndex > 0) {
        const lastValue = parseInt(inputs[currentIndex - 1], 10);
        const currentValue = parseInt(inputRow, 10);

        if (currentValue > lastValue) {
          return incremented + 1;
        }
      }

      return incremented;
    },
    0
  );

  console.log("amountIncremented", amountIncremented);
}

function part2(inputs: string[]): void {
  function getSlidingSum(endIndex: number): number {
    const rawValues = inputs.slice(endIndex - 2, endIndex + 1);
    const values = rawValues.map((value) => parseInt(value, 10));
    const sum = values.reduce((accumulated, value) => accumulated + value, 0);
    return sum;
  }

  const slidingSumsIncremented = inputs.reduce(
    (incremented, _, currentIndex) => {
      if (currentIndex > 1) {
        const sum1 = getSlidingSum(currentIndex);
        const sum2 = getSlidingSum(currentIndex + 1);

        if (sum2 > sum1) {
          return incremented + 1;
        }
      }

      return incremented;
    },
    0
  );

  console.log("slidingSumsIncremented", slidingSumsIncremented);
}

(async () => {
  const input = await readInput(1);

  const inputs = input.split("\n");

  part1(inputs);
  part2(inputs);
})();
