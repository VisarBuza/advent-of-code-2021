import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const lines = this.parseInput();
    const [maxX, maxY] = this.getBoardEdges(lines);
    const board = new Array(maxX + 1)
      .fill('')
      .map(() => new Array(maxY + 1).fill('.'));

    for (const [pointOne, pointTwo] of lines) {
      let [xOne, yOne, xTwo, yTwo] = [...pointOne, ...pointTwo];

      if (xOne !== xTwo && yOne !== yTwo) continue;

      if (yOne === yTwo) {
        if (xTwo < xOne) [xOne, xTwo] = [xTwo, xOne];

        for (let i = xOne; i <= xTwo; i++) {
          const current = board[i][yOne];
          board[i][yOne] = current === '.' ? 1 : current + 1;
        }
      } else {
        if (yTwo < yOne) [yOne, yTwo] = [yTwo, yOne];

        for (let i = yOne; i <= yTwo; i++) {
          const current = board[xOne][i];
          board[xOne][i] = current === '.' ? 1 : current + 1;
        }
      }
    }

    return this.calculateTotal(board);
  }

  public getFirstExpectedResult(): string {
    return '5';
  }

  public solveSecond(): string {
    const lines = this.parseInput();
    const [maxX, maxY] = this.getBoardEdges(lines);
    const board = new Array(maxX + 1)
      .fill('')
      .map(() => new Array(maxY + 1).fill('.'));

    for (const [pointOne, pointTwo] of lines) {
      const [xOne, yOne, xTwo, yTwo] = [...pointOne, ...pointTwo];
      const xDirection = xOne > xTwo ? -1 : 1;
      const yDirection = yOne > yTwo ? -1 : 1;

      if (yOne === yTwo) {
        for (let i = xOne; i !== xTwo + xDirection; i += xDirection) {
          const current = board[i][yOne];
          board[i][yOne] = current === '.' ? 1 : current + 1;
        }
      } else if (xOne === xTwo) {
        for (let i = yOne; i !== yTwo + yDirection; i += yDirection) {
          const current = board[xOne][i];
          board[xOne][i] = current === '.' ? 1 : current + 1;
        }
      } else {
        for (
          let i = xOne, j = yOne;
          i !== xTwo + xDirection || j !== yTwo + yDirection;
          i += xDirection, j += yDirection
        ) {
          const current = board[i][j];
          board[i][j] = current === '.' ? 1 : current + 1;
        }
      }
    }

    return this.calculateTotal(board);
  }

  public getSecondExpectedResult(): string {
    return '12';
  }

  private parseInput(): number[][][] {
    return this.input
      .split('\n')
      .map((x) =>
        x.split(' -> ').map((y) => y.split(',').map((z) => parseInt(z)))
      );
  }

  private getBoardEdges(lines: number[][][]): [number, number] {
    let maxX = 0;
    let maxY = 0;

    for (const [pointOne, pointTwo] of lines) {
      const [xOne, yOne, xTwo, yTwo] = [...pointOne, ...pointTwo];

      maxX = Math.max(xOne, xTwo, maxX);
      maxY = Math.max(yOne, yTwo, maxY);
    }

    return [maxX, maxY];
  }

  private calculateTotal(board: any[][]): string {
    return board
      .reduce(
        (total, col) =>
          total +
          col.reduce((colTotal, val) => {
            if (val === '.' || val === 1) return colTotal;

            return colTotal + 1;
          }, 0),
        0
      )
      .toString();
  }
}
