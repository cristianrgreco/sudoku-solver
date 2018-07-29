const EMPTY = 0;

function solve(sudoku) {
  const size = sudoku.length;
  const spots = getSpots(sudoku);

  return backtrack(sudoku, 0, 1);

  function backtrack(sudoku, spotIndex, candidate) {
    if (spotIndex === spots.length) {
      return sudoku;
    }

    const spot = spots[spotIndex];

    if (isValidMove(sudoku, size, spot, candidate)) {
      const nextSudoku = setSudoku(sudoku, spot, candidate);
      const solution = backtrack(nextSudoku, spotIndex + 1, 1);

      if (solution) {
        return solution;
      } else {
        return backtrack(sudoku, spotIndex, candidate + 1);
      }
    }
  }
}

function getSpots(sudoku) {
  const spots = [];

  for (let y = 0; y < sudoku.length; y++) {
    const row = sudoku[y];

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell === EMPTY) {
        spots.push({ x, y });
      }
    }
  }

  return spots;
}

function isValidMove(sudoku, size, { x, y }, candidate) {
  return isValidHorizontal() && isValidVertically() && isValidSubGroup();

  function isValidHorizontal() {
    const cells = sudoku[y];
    return !containsCandidate(cells, candidate);
  }

  function isValidVertically() {
    const cells = sudoku.map((row, y) => sudoku[y][x]);
    return !containsCandidate(cells, candidate);
  }

  function isValidSubGroup() {
    const subGroupSize = Math.sqrt(size);

    if (subGroupSize % 1 !== 0) {
      return true;
    }

    const cells = getSubGroup(subGroupSize);
    return !containsCandidate(cells, candidate);
  }

  function getSubGroup(subGroupSize) {
    const offset = Math.floor(x / subGroupSize) * subGroupSize;

    const cells = [];

    for (let y = offset; y < offset + subGroupSize; y++) {
      for (let x = offset; x < offset + subGroupSize; x++) {
        cells.push(sudoku[y][x]);
      }
    }

    return cells;
  }

  function containsCandidate(cells, candidate) {
    return cells.find(cell => cell === candidate) !== undefined;
  }
}

function setSudoku(sudoku, { x, y }, candidate) {
  return sudoku.map((row, rowIndex) => {
    if (rowIndex === y) {
      return [...row.slice(0, x), candidate, ...row.slice(x + 1)];
    } else {
      return row;
    }
  });
}

module.exports = {
  solve,
  getSpots,
  isValidMove,
  setSudoku
};
