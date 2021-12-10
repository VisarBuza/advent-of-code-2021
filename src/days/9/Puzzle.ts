import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const heightmap = this.input.split('\n').map(row => row.split('').map(x => +x));
    let sumOfRisk = 0;
    for (let i = 0; i < heightmap.length; i++) {
      for (let j = 0; j < heightmap[i].length; j++) {
        if (this.isLowPoint(i, j, heightmap)) sumOfRisk += heightmap[i][j] + 1;
      }
    }
    return sumOfRisk.toString();
  }

  public isLowPoint(row: number, column: number, heightmap: number[][]): boolean {
    const entry = heightmap[row][column];
    const leftEntry = column - 1 >= 0 ? heightmap[row][column - 1] : Number.MAX_VALUE;
    const rightEntry = column + 1 < heightmap[row].length ? heightmap[row][column + 1] : Number.MAX_VALUE;
    const upperEntry = row - 1 >= 0 ? heightmap[row - 1][column] : Number.MAX_VALUE;
    const lowerEntry = row + 1 < heightmap.length ? heightmap[row + 1][column] : Number.MAX_VALUE;


    return (entry < leftEntry) && (entry < rightEntry) && (entry < upperEntry) && (entry < lowerEntry);
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '15';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const heightmap = this.input.split('\n').map(row => row.split('').map(x => +x));
    const basins = [];
    const visited = Array(heightmap.length).fill(Array(heightmap[0].length));
    for (let i = 0; i < heightmap.length; i++) {
      for (let j = 0; j < heightmap[i].length; j++) {
        if (this.isLowPoint(i, j, heightmap)) {
          basins.push(this.getBaisinSize(heightmap[i][j], i, j, heightmap, visited));
        }
      }
    }

    return basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, curr) => acc * curr, 1).toString();
  }

  public getBaisinSize(entry: number, row: number, column: number, heightmap: number[][], visited: number[][]): number {
    if (entry === null) return 0;
    if (entry == 9)
      return 0;
    if (visited[row][column] == 1) return 0;

    visited[row][column] = 1;

    const leftEntry = column - 1 >= 0 ? heightmap[row][column - 1] : null;
    const rightEntry = column + 1 < heightmap[row].length ? heightmap[row][column + 1] : null;
    const upperEntry = row - 1 >= 0 ? heightmap[row - 1][column] : null;
    const lowerEntry = row + 1 < heightmap.length ? heightmap[row + 1][column] : null;


    return 1 + this.getBaisinSize(leftEntry, row, column - 1, heightmap, visited)
      + this.getBaisinSize(rightEntry, row, column + 1, heightmap, visited)
      + this.getBaisinSize(upperEntry, row - 1, column, heightmap, visited)
      + this.getBaisinSize(lowerEntry, row + 1, column, heightmap, visited);
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '1134';
  }
}
