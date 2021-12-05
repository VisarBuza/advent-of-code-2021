import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const arr = this.input.split('\n');
    const bitFrequencies = this.getBitFrequencies(arr);

    const gammaRate = bitFrequencies.map(x => x >= 500 ? '1' : '0').join('');
    const epsilonRate = bitFrequencies.map(x => x <= 500 ? '1' : '0').join('');

    return (parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)).toString();
  }

  public getFirstExpectedResult(): string {
    return '198';
  }

  public solveSecond(): string {
    const arr = this.input.split('\n');

    let oxygenGeneratorRating = arr;
    let co2Rating = arr;

    let index = 0;
    while (oxygenGeneratorRating.length > 1) {
      const frequency = this.getBitFrequencies(oxygenGeneratorRating);
      const majority = frequency[index] >= Math.ceil(oxygenGeneratorRating.length / 2) ? '1' : '0';
      oxygenGeneratorRating = oxygenGeneratorRating.filter(x => x[index] == majority);
      index++;
    }

    index = 0;

    while (co2Rating.length > 1) {
      const frequency = this.getBitFrequencies(co2Rating);
      const majority = frequency[index] < Math.ceil(co2Rating.length / 2) ? '1' : '0';
      co2Rating = co2Rating.filter(x => x[index] == majority);
      index++;
    }

    return (parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2Rating[0], 2)).toString();
  }

  public getBitFrequencies(input: string[]) {
    const bitFrequencies = new Array(12).fill(0);

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === '1') {
          bitFrequencies[j]++;
        }
      }
    }

    return bitFrequencies;
  }

  public getSecondExpectedResult(): string {
    return '230';
  }
}
