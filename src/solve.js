const EMPTY = 0;

function solve(sudoku) {
  const size = sudoku.length;
  const spots = getSpots(sudoku);

  return backtrack(sudoku, 0);

  function backtrack(sudoku, spotIndex) {
    if (spotIndex === spots.length) {
      return sudoku;
    }

    const spot = spots[spotIndex];

    for (let candidate = 1; candidate <= size; candidate++) {
      if (isValidMove(sudoku, size, spot, candidate)) {
        const nextSudoku = setSudoku(sudoku, spot, candidate);
        const solution = backtrack(nextSudoku, spotIndex + 1)
        if (solution) {
          return solution;
        }
      }
    }

    return false;
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
  return isValidHorizontally() && isValidVertically() && isValidSubGroup();

  function isValidHorizontally() {
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
    const xOffset = Math.floor(x / subGroupSize) * subGroupSize;
    const yOffset = Math.floor(y / subGroupSize) * subGroupSize;

    const cells = [];

    for (let y = yOffset; y < yOffset + subGroupSize; y++) {
      for (let x = xOffset; x < xOffset + subGroupSize; x++) {
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
