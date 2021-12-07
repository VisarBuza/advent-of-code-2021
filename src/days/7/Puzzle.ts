import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
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
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

  public median(arr: number[]): number {
    const middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
  };
}
