import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const arr = this.input.split('\n');
    const mostCommon = Array(arr[0].length).fill(0);

    for (const binary of arr) {
      for (let i = 0; i < binary.length; i++)
        if (binary[i] === '1') mostCommon[i]++;
        else mostCommon[i]--;
    }

    const gamma = parseInt(
      mostCommon.map((x) => (x >= 0 ? '1' : '0')).join(''),
      2
    );
    const epsilon = parseInt(
      mostCommon.map((x) => (x >= 0 ? '0' : '1')).join(''),
      2
    );

    return (gamma * epsilon).toString();
  }

  public getFirstExpectedResult(): string {
    return '198';
  }

  public solveSecond(): string {
    const arr = this.input.split('\n');

    const [oxygenNumber, co2Number] = [
      this.getNumber(arr, 'oxygen'),
      this.getNumber(arr, 'co2'),
    ];

    return (oxygenNumber * co2Number).toString();
  }

  private getNumber(arr: string[], type: 'oxygen' | 'co2'): number {
    let numbers = [...arr];
    let counter = 0;
    const mainCharacter = type === 'oxygen' ? '1' : '0';
    const secondaryCharacter = type === 'oxygen' ? '0' : '1';
    for (let i = 0; i < arr[0].length; i++) {
      for (const number of numbers) {
        if (number[i] === mainCharacter) counter++;
        else counter--;
      }

      let charToMatch = '';
      if (type === 'oxygen') {
        charToMatch = counter >= 0 ? mainCharacter : secondaryCharacter;
      } else {
        charToMatch = counter <= 0 ? mainCharacter : secondaryCharacter;
      }

      numbers = numbers.filter((x) => x[i] === charToMatch);
      counter = 0;

      if (numbers.length === 1) break;
    }

    return parseInt(numbers[0], 2);
  }

  public getSecondExpectedResult(): string {
    return '230';
  }
}
