import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const outputValues = this.input.split('\n')
      .map(x => x.split(' | ')[1].split(' '))
      .flat()
      .reduce((acc, curr) => {
        if (curr.length == 2 || curr.length == 4 || curr.length == 7 || curr.length == 3) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return outputValues.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;

    return '26';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const rows = this.input.split('\n');
    let sum = 0;

    for (const row of rows) {
      const segmentMap = new Map();
      const [allNums, output] = row.split(' | ');
      const nums = allNums.split(' ').map((x) => x.split('').sort().join(''));

      const one = nums.find((x) => x.length === 2);
      const four = nums.find((x) => x.length === 4);
      const fourDiff = four.replace(one[0], '').replace(one[1], '');

      segmentMap.set(one, 1);
      segmentMap.set(four, 4);
      segmentMap.set(
        nums.find((x) => x.length === 3),
        7
      );
      segmentMap.set(
        nums.find((x) => x.length === 7),
        8
      );

      const twoThreeFive = nums.filter((x) => x.length === 5);
      const zeroSixNine = nums.filter((x) => x.length === 6);

      for (const num of twoThreeFive) {
        if (num.includes(one[0]) && num.includes(one[1]))
          segmentMap.set(num, 3);
        else if (num.includes(fourDiff[0]) && num.includes(fourDiff[1]))
          segmentMap.set(num, 5);
        else segmentMap.set(num, 2);
      }

      for (const num of zeroSixNine) {
        if (
          num.includes(four[0]) &&
          num.includes(four[1]) &&
          num.includes(four[2]) &&
          num.includes(four[3])
        )
          segmentMap.set(num, 9);
        else if (num.includes(fourDiff[0]) && num.includes(fourDiff[1]))
          segmentMap.set(num, 6);
        else segmentMap.set(num, 0);
      }

      sum += +output
        .split(' ')
        .map((x) => segmentMap.get(x.split('').sort().join('')))
        .join('');
    }

    return sum.toString();
  }

  public getNumbers(arr: string[]) {

    const one = arr.find(x => x.length == 2);
    const four = arr.find(x => x.length == 4);
    const seven = arr.find(x => x.length == 3);
    const eight = arr.find(x => x.length == 7);

    const map = new Map<string, number>();

    for (const el of arr) {
      let number = 0;
      if (el.length == 5) {
        if (el.includes(one)) {
          number = 3;
        } else if (this.includesFour(el, four) == 2) {
          number = 5;
        } else {
          number = 2;
        }
      } else if (el.length == 6) {
        if (el.includes(four)) {
          number = 9;
        } else if (this.includesFour(el, four) == 2) {
          number = 6;
        } else {
          number = 0;
        }
      }
      map.set(el.split('').sort().join(''), number);
    }
    map.set(one.split('').sort().join(''), 1);
    map.set(four.split('').sort().join(''), 4);
    map.set(seven.split('').sort().join(''), 7);
    map.set(eight.split('').sort().join(''), 8);
    return map;
  }

  public includesFour(str1: string, str2: string) {
    let counter = 0;
    for (const el of str2) {
      if (str1.includes(el))
        counter++;
    }
    return counter;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '61229';
  }
}
