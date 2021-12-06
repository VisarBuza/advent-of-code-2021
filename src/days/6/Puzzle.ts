import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const fish = this.input.split(',').map(x => parseInt(x.trim()));

    for (let i = 0; i < 80; i++) {
      const length = fish.length;
      for (let j = 0; j < length; j++) {
        if (fish[j] === 0) {
          fish[j] = 6;
          fish.push(8);
          continue;
        }
        fish[j]--;
      }
    }

    return fish.length.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const fish = this.input.split(',').map(x => parseInt(x.trim()));
    const fishMap = new Array(9).fill(0);
    for (const f of fish) {
      fishMap[f]++;
    }

    for (let i = 0; i < 256; i++) {
      const lastDay = fishMap[0];
      fishMap[0] = fishMap[1];
      fishMap[1] = fishMap[2];
      fishMap[2] = fishMap[3];
      fishMap[3] = fishMap[4];
      fishMap[4] = fishMap[5];
      fishMap[5] = fishMap[6];
      fishMap[6] = fishMap[7];
      fishMap[6] += lastDay;
      fishMap[7] = fishMap[8];
      fishMap[8] = lastDay;
    }

    return fishMap.reduce((acc, next) => acc + next, 0).toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '1740449478328';
  }
}
