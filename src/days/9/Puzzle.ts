import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const matrix = this.input
      .split('\n')
      .map((x) => x.split('').map((y) => +y));

    const lowestPointCoordinates = this.getLowPointsPositions(matrix);
    return lowestPointCoordinates
      .reduce((acc, [i, j]) => acc + matrix[i][j] + 1, 0)
      .toString();
  }

  public getFirstExpectedResult(): string {
    return '15';
  }

  public solveSecond(): string {
    const matrix = this.input
      .split('\n')
      .map((x) => x.split('').map((y) => +y));
    const basinSizes: number[] = [];

    const lowestPointCoordinates = this.getLowPointsPositions(matrix);

    for (const [i, j] of lowestPointCoordinates) {
      basinSizes.push(this.getBasinSize(matrix, i, j));
    }

    return basinSizes
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, curr) => acc * curr, 1)
      .toString();
  }

  public getSecondExpectedResult(): string {
    return '1134';
  }

  private getLowPointsPositions(matrix: number[][]): [number, number][] {
    const lowestPoints: [number, number][] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        const current = matrix[i][j];
        const neighbors = this.getNeighbors(matrix, i, j).map(
          ([neighborI, neighborJ]) => matrix[neighborI][neighborJ]
        );

        if (current < Math.min(...neighbors)) lowestPoints.push([i, j]);
      }
    }

    return lowestPoints;
  }

  private getBasinSize(
    matrix: number[][],
    i: number,
    j: number,
    visited: [number, number][] = []
  ): number {
    let size = 1;
    visited.push([i, j]);
    const neighbors = this.getNeighbors(matrix, i, j);

    for (const [nextI, nextJ] of neighbors) {
      if (
        matrix[nextI][nextJ] !== 9 &&
        !visited.some(
          ([visitedI, visitedJ]) => visitedI === nextI && visitedJ === nextJ
        )
      ) {
        size += this.getBasinSize(matrix, nextI, nextJ, visited);
      }
    }

    return size;
  }

  private getNeighbors(matrix: number[][], i: number, j: number) {
    const leftIndex = j - 1 >= 0 ? [i, j - 1] : null;
    const topIndex = i - 1 >= 0 ? [i - 1, j] : null;
    const rightIndex = j + 1 < matrix[0].length ? [i, j + 1] : null;
    const bottomIndex = i + 1 < matrix.length ? [i + 1, j] : null;

    return [leftIndex, topIndex, rightIndex, bottomIndex].filter(
      (x) => x !== null
    );
  }
}
