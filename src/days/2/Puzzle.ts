import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    let horizontal = 0;
    let depth = 0;
    for (const instruction of this.input.split('\n')) {
      const [direction, amount] = instruction.split(' ');
      if (direction === 'forward') horizontal += +amount;
      else if (direction === 'down') depth += +amount;
      else if (direction === 'up') depth -= +amount;
    }

    return (horizontal * depth).toString();
  }

  public getFirstExpectedResult(): string {
    return '150';
  }

  public solveSecond(): string {
    let aim = 0;
    let horizontal = 0;
    let depth = 0;
    for (const instruction of this.input.split('\n')) {
      const [direction, amount] = instruction.split(' ');
      if (direction === 'forward') {
        horizontal += +amount;
        depth += aim * +amount;
      } else if (direction === 'down') aim += +amount;
      else if (direction === 'up') aim -= +amount;
    }

    return (horizontal * depth).toString();
  }

  public getSecondExpectedResult(): string {
    return '900';
  }
}
