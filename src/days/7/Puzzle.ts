import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const arr = this.input.split(',').map(x => +x);
    const median = this.median(arr);
    const fuelSpent = arr.reduce((acc, next) => acc + Math.abs(next - median), 0);

    return fuelSpent.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '37';
  }

  public solveSecond(): string {
    const arr = this.input.split(',').map(x => +x);

    let fuelSpent = Number.MAX_VALUE;
    for (let i = 0; i <= 2000; i++) {
      let current = 0;
      for (let j = 0; j < arr.length; j++) {
        const steps = Math.abs(arr[j] - i);
        current += (steps * (steps + 1)) / 2;
      }
      if (current < fuelSpent)
        fuelSpent = current;
    }

    return fuelSpent.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '168';
  }

  public median(arr: number[]): number {
    const middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
  };
}
