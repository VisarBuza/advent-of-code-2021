import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const lines = this.input.split('\n').map(line => line.split('-'));
    const adjacencyList = new Map<string, string[]>();
    for (const [first, second] of lines) {
      if (!adjacencyList.has(first)) adjacencyList.set(first, []);

      if (!adjacencyList.has(second)) adjacencyList.set(second, []);

      adjacencyList.get(first).push(second);
      adjacencyList.get(second).push(first);
    }

    return this.dfs(['start'], adjacencyList).toString();
  }

  public dfs(path: string[], adjacencyList: Map<string, string[]>): number {
    let pathCount = 0;
    const neighbors = adjacencyList.get(path[path.length - 1]);

    for (const neighbor of neighbors) {
      if (neighbor === neighbor.toUpperCase() || !path.includes(neighbor))
        neighbor === 'end'
          ? (pathCount += 1)
          : (pathCount += this.dfs(path.concat([neighbor]), adjacencyList,));
    }

    return pathCount;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '10';
  }

  public solveSecond(): string {
    const connections = this.input.split('\n').map((x) => x.split('-'));
    const adjacencyList = new Map<string, string[]>();

    for (const [first, second] of connections) {
      if (!adjacencyList.has(first)) adjacencyList.set(first, []);

      if (!adjacencyList.has(second)) adjacencyList.set(second, []);

      adjacencyList.get(first).push(second);
      adjacencyList.get(second).push(first);
    }

    return this.getPathCount2(adjacencyList).toString();
  }

  private getPathCount2(
    adjacencyList: Map<string, string[]>,
    path: string[] = ['start']
  ): number {
    let pathCount = 0;
    for (const cave of adjacencyList.get(path[path.length - 1])) {
      if (cave === 'start') continue;
      if (cave === 'end') pathCount += 1;
      else if (cave === cave.toLowerCase() && path.includes(cave)) {
        pathCount += this.dfs(path.concat([cave]), adjacencyList);
      } else {
        pathCount += this.getPathCount2(adjacencyList, path.concat([cave]));
      }
    }

    return pathCount;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '36';
  }
}
