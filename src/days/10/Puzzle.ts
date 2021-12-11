import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const openingCharacters = ['(', '[', '{', '<'];
    const closingCharacters = [')', ']', '}', '>'];
    const points: { [key: string]: number } = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    };
    const subsytem = this.input.split('\n').map(x => x.split(''));
    let score = 0;
    for (const line of subsytem) {
      const lineStack = [];
      for (const char of line) {
        if (openingCharacters.includes(char)) {
          lineStack.push(char);
        } else {
          if (char !== closingCharacters[openingCharacters.indexOf(lineStack.pop())]) {
            score += points[char];
            break;
          }
        }
      }
    }

    return score.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '26397';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const openingCharacters = ['(', '[', '{', '<'];
    const closingCharacters = [')', ']', '}', '>'];
    const points: { [key: string]: number } = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    };
    const subsytem = this.input.split('\n').map(x => x.split(''));

    const scores = [];
    for (const line of subsytem) {
      let stack = [];
      for (const char of line) {
        if (openingCharacters.includes(char)) {
          stack.push(char);
        } else {
          if (char !== closingCharacters[openingCharacters.indexOf(stack.pop())]) {
            stack = [];
            break;
          }
        }
      }
      if (stack.length === 0) continue;
      const score = stack.reverse().reduce((acc, curr) => acc * 5 + points[closingCharacters[openingCharacters.indexOf(curr)]], 0);
      scores.push(score);
    }

    return scores.sort((a, b) => a - b)[(scores.length - 1) / 2].toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '288957';
  }
}
