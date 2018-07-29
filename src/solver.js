const EMPTY = 0;

function solver(sudoku, size = 3) {
  const spots = getSpots(sudoku);

  function solve(sudoku, spotIndex, candidate) {
    if (spotIndex === spots.length) {
      return sudoku;
    }

    const spot = spots[spotIndex];

    if (isValidMove(sudoku, size, spot, candidate)) {
      const nextSudoku = setSudoku(sudoku, spot, candidate);
      return solve(nextSudoku, spotIndex + 1, 1);
    } else if (candidate < size) {
      return solve(sudoku, spotIndex, candidate + 1);
    }
  }

  return solve(sudoku, 0);
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
  function isValidHorizontal() {
    const cells = sudoku[y];
    return !containsCandidate(cells, candidate);
  }

  function isValidVertically() {
    const cells = sudoku.map((row, i) => sudoku[i][x]);
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
    const rowOffset = Math.floor(x / subGroupSize) * subGroupSize;

    const cells = [];

    for (let y = rowOffset; y < rowOffset + subGroupSize; y++) {
      for (let x = rowOffset; x < rowOffset + subGroupSize; x++) {
        cells.push(sudoku[y][x]);
      }
    }

    return cells;
  }

  function containsCandidate(cells, candidate) {
    return cells.find(cell => cell === candidate) !== undefined;
  }

  return isValidHorizontal() && isValidVertically() && isValidSubGroup();
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
  solver,
  getSpots,
  isValidMove,
  setSudoku
};
