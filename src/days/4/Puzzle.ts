import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const split = this.input.split('\n');
    const numbersCalled = split[0].split(',').map((x) => parseInt(x));
    const boards = this.parseBoards(split);

    for (const number of numbersCalled) {
      for (const board of boards) {
        if (this.checkForNumber(board, number) && this.checkForVictory(board)) {
          return this.calculateScore(board, number).toString();
        }
      }
    }

    return '';
  }

  public getFirstExpectedResult(): string {
    return '4512';
  }

  public solveSecond(): string {
    const split = this.input.split('\n');
    const numbersCalled = split[0].split(',').map((x) => parseInt(x));
    const boards = this.parseBoards(split);

    for (const number of numbersCalled) {
      for (let i = boards.length - 1; i >= 0; i--) {
        if (
          this.checkForNumber(boards[i], number) &&
          this.checkForVictory(boards[i])
        ) {
          const deleted = boards.splice(i, 1);
          if (boards.length === 0)
            return this.calculateScore(deleted[0], number).toString();
        }
      }
    }

    return '';
  }

  public getSecondExpectedResult(): string {
    return '1924';
  }

  private parseBoards(input: string[]): number[][][] {
    const boards = [];
    for (let i = 2; i < input.length; i += 6) {
      boards.push(
        input.slice(i, i + 5).map((x) =>
          x
            .trim()
            .split(/\s+/)
            .map((y) => parseInt(y))
        )
      );
    }

    return boards;
  }

  private checkForNumber(board: number[][], number: number): boolean {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === number) {
          board[i][j] = -1;
          return true;
        }
      }
    }

    return false;
  }

  private checkForVictory(board: number[][]): boolean {
    for (const row of board) {
      if (row.every((x) => x === -1)) return true;
    }

    for (let i = 0; i < board.length; i++) {
      const col = board.map((x) => x[i]);
      if (col.every((x) => x === -1)) return true;
    }

    return false;
  }

  private calculateScore(board: number[][], number: number): number {
    return (
      board.reduce(
        (acc, row) =>
          acc +
          row.reduce((acc2, el) => {
            if (el === -1) return acc2;
            return acc2 + el;
          }, 0),
        0
      ) * number
    );
  }
}
