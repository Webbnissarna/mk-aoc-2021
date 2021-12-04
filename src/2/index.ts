import { readInput } from "../utils.js";

function part1(inputs: string[]) {
  const forwardCommands = inputs.filter((input) => input[0] === "f");
  const depthCommands = inputs.filter((input) => ["u", "d"].includes(input[0]));

  const forwardCommandSkipLength = "forward ".length;
  const forwardValues = forwardCommands.map((command) =>
    parseInt(command.slice(forwardCommandSkipLength), 10)
  );

  const forwardSum = forwardValues.reduce(
    (accumulated, value) => accumulated + value,
    0
  );

  const depthSum = depthCommands.reduce((accumulated, command) => {
    if (command[0] === "d") {
      const skipLength = "down ".length;
      const value = parseInt(command.slice(skipLength), 0);
      return accumulated + value;
    } else {
      const skipLength = "up ".length;
      const value = parseInt(command.slice(skipLength), 0);
      return accumulated - value;
    }
  }, 0);

  const multiplied = forwardSum * depthSum;

  console.log("forwardSum", forwardSum);
  console.log("depthSum", depthSum);
  console.log("multiplied", multiplied);
}

function part2(inputs: string[]) {
  interface ShipTransform {
    horizontalPosition: number;
    depth: number;
    aim: number;
  }

  const finalTransform = inputs.reduce(
    (currentTransform, command) => {
      const commandParts = command.split(" ");
      const action = commandParts[0][0];
      const value = parseInt(commandParts[1]);

      switch (action) {
        case "d": {
          return {
            ...currentTransform,
            aim: currentTransform.aim + value,
          };
        }

        case "u": {
          return {
            ...currentTransform,
            aim: currentTransform.aim - value,
          };
        }

        case "f": {
          return {
            ...currentTransform,
            horizontalPosition: currentTransform.horizontalPosition + value,
            depth: currentTransform.depth + currentTransform.aim * value,
          };
        }
      }
    },
    <ShipTransform>{ horizontalPosition: 0, depth: 0, aim: 0 }
  );

  const multiplied = finalTransform.horizontalPosition * finalTransform.depth;

  console.log("finalTransform", finalTransform);
  console.log("multiplied", multiplied);
}

(async () => {
  const input = await readInput(2);

  const inputs = input.split("\n");

  part1(inputs);
  part2(inputs);
})();
