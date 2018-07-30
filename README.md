# Sudoku Solver

Solves sudokus puzzles.

## Usage

Input is a 2-dimensional array of any size, with empty spaces represented as `0`.

Output is a 2-dimensional array containing the solution, or `false` if one was not found.

```
const solve = require('.');

solve([
  [1, 2, 3],
  [2, 0, 1],
  [3, 1, 2]
])

// returns [ [ 1, 2, 3 ], [ 2, 3, 1 ], [ 3, 1, 2 ] ]
```
