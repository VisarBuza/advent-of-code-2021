import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const octopuses = this.input.split('\n').map(x => x.split('').map(x => new Octopus(+x)));

    const score = Array(100).fill(0).reduce((acc) => acc + this.simulateDay(octopuses), 0);

    return score.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '1656';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const octopuses = this.input.split('\n').map(x => x.split('').map(x => new Octopus(+x)));

    const score = this.getDayWhenAllDumbosFlash(octopuses);

    return score.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '195';
  }

  public simulateDay(octopuses: Octopus[][]): number {
    let score = 0;
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
    return score;
  }

  public getDayWhenAllDumbosFlash(octopuses: Octopus[][]): number {
    let day = 0;
    let score = 0;
    while (score != 100) {
      score = 0;
      score += this.simulateDay(octopuses);
      day++;
    }
    return day;
  }

  increaseEnergy(i: number, j: number, octopuses: Octopus[][]) {
    octopuses[i][j].increaseEnergy();
    if (octopuses[i][j].energyLevel > 9) {
      if (octopuses[i][j].flashed) return;
      octopuses[i][j].flashed = true;
      this.getNeighbors(i, j).forEach(([row, column]) => {
        this.increaseEnergy(row, column, octopuses);
      });
    }
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
    ].filter(([row, column]) => row >= 0 && row < 10 && column >= 0 && column < 10);
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
