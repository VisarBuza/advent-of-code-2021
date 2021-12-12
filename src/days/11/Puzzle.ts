import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const octopuses = this.input.split('\n').map(x => x.split('').map(x => new Octopus(+x)));

    const score = this.simulateDays(100, octopuses);

    return score.toString();
  }

  public simulateDays(days: number, octopuses: Octopus[][]): number {
    let score = 0;
    for (let d = 0; d < days; d++) {
      for (let i = 0; i < octopuses.length; i++) {
        for (let j = 0; j < octopuses[i].length; j++) {
          this.increaseEnergy(i, j, octopuses);
        }
      }

      for (let i = 0; i < octopuses.length; i++) {
        for (let j = 0; j < octopuses[i].length; j++) {
          octopuses[i][j].flashed = false;
          if (octopuses[i][j].energyLevel > 9) {
            score++;
            octopuses[i][j].energyLevel = 0;
          }
        }
      }
    }
    return score;
  }

  increaseEnergy(i: number, j: number, octopuses: Octopus[][]) {
    octopuses[i][j].increaseEnergy();
    if (octopuses[i][j].energyLevel > 9) {
      if (octopuses[i][j].flashed) return;
      octopuses[i][j].flashed = true;
      this.getNeighbors(i, j)
        .filter(([row, column]) => this.isValid(row, column))
        .forEach(([row, column]) => {
          this.increaseEnergy(row, column, octopuses);
        });
    }
  }

  public isValid(row: number, column: number): boolean {
    return row >= 0 && row < 10 && column >= 0 && column < 10;
  }

  public getNeighbors(row: number, column: number) {
    return [
      [row - 1, column - 1],
      [row - 1, column],
      [row - 1, column + 1],
      [row, column - 1],
      [row, column + 1],
      [row + 1, column - 1],
      [row + 1, column],
      [row + 1, column + 1]
    ];
  }



  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '1656';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

class Octopus {
  public flashed: boolean;
  public energyLevel: number;

  constructor(energyLevel: number) {
    this.energyLevel = energyLevel;
    this.flashed = false;
  }

  public flash() {
    this.flashed = true;
  }

  public increaseEnergy() {
    this.energyLevel++;
  }

  public resetEnergy() {
    this.energyLevel = 0;
  }
} 
