import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const arr = this.input.split('\n').map((x) => +x);
    let sum = 0;
    for (let i = 1; i < arr.length; i++) if (arr[i] > arr[i - 1]) sum++;

    return sum.toString();
  }

  public getFirstExpectedResult(): string {
    return '7';
  }

  public solveSecond(): string {
    const arr = this.input.split('\n').map((x) => +x);
    let sum = 0;
    for (let i = 0; i < arr.length - 2; i++)
      if (
        arr[i] + arr[i + 1] + arr[i + 2] <
        arr[i + 1] + arr[i + 2] + arr[i + 3]
      )
        sum++;

    return sum.toString();
  }

  public getSecondExpectedResult(): string {
    return '5';
  }
}
