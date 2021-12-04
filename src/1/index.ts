import { promises as fs } from "fs";
import path from "path";

async function readInput(challengeID: number): Promise<string> {
  const filePath = path.join("src/", challengeID.toString(), "input");
  const file = await fs.readFile(filePath, { encoding: "utf-8" });
  return file;
}

async function part1(inputs: string[]): Promise<void> {
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

async function part2(inputs: string[]): Promise<void> {
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

  await part1(inputs);
  await part2(inputs);
})();
