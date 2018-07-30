const {
  solve,
  getSpots,
  isValidMove,
  setSudoku,
} = require('./solve');

describe('solve', () => {
  it('should solve a 3x3 sudoku', () => {
    const sudoku = [
      [2, 0, 3],
      [1, 0, 0],
      [0, 0, 1]
    ];

    const solution = solve(sudoku);

    expect(solution).toEqual([
      [2, 1, 3],
      [1, 3, 2],
      [3, 2, 1]
    ]);
  });

  it('should solve a 9x9 sudoku', () => {
    const sudoku = [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ];

    const solution = solve(sudoku);

    expect(solution).toEqual([
      [3, 1, 6, 5, 7, 8, 4, 9, 2],
      [5, 2, 9, 1, 3, 4, 7, 6, 8],
      [4, 8, 7, 6, 2, 9, 5, 3, 1],
      [2, 6, 3, 4, 1, 5, 9, 8, 7],
      [9, 7, 4, 8, 6, 3, 1, 2, 5],
      [8, 5, 1, 7, 9, 2, 6, 4, 3],
      [1, 3, 8, 9, 4, 7, 2, 5, 6],
      [6, 9, 2, 3, 5, 1, 8, 7, 4],
      [7, 4, 5, 2, 8, 6, 3, 1, 9]
    ]);
  });

  it('should return empty spots', () => {
    const sudoku = [
      [2, 0, 3],
      [1, 0, 0],
      [0, 0, 1]
    ];

    const spots = getSpots(sudoku);

    expect(spots).toEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]);
  });

  it('should return true if a valid move', () => {
    const sudoku = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    const result = isValidMove(sudoku, 3, { x: 0, y: 0 }, 1);

    expect(result).toBe(true);
  });

  it('should return false if not a valid move horizontally', () => {
    const sudoku = [
      [3, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    const result = isValidMove(sudoku, 3, { x: 1, y: 0 }, 3);

    expect(result).toBe(false);
  });

  it('should return false if not a valid move vertically', () => {
    const sudoku = [
      [3, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    const result = isValidMove(sudoku, 3, { x: 0, y: 1 }, 3);

    expect(result).toBe(false);
  });

  it('should return false if not a valid move sub-group', () => {
    function testCase1() {
      const sudoku = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 4, 0],
        [0, 0, 0, 0],
      ];

      const result = isValidMove(sudoku, 4, { x: 3, y: 3 }, 4);

      expect(result).toBe(false);
    }

    function testCase2() {
      const sudoku = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 4],
      ];

      const result = isValidMove(sudoku, 4, { x: 2, y: 2 }, 4);

      expect(result).toBe(false);
    }

    testCase1();
    testCase2();
  });

  it('should immutably set a candidate', () => {
    const sudoku = [
      [2, 0, 3],
      [1, 0, 0],
      [0, 0, 1]
    ];

    const sudoku1 = setSudoku(sudoku, { x: 1, y: 1 }, 3);
    const sudoku2 = setSudoku(sudoku1, { x: 0, y: 2 }, 3);

    expect(sudoku2).toEqual([
      [2, 0, 3],
      [1, 3, 0],
      [3, 0, 1]
    ]);
    expect(sudoku1).not.toBe(sudoku);
    expect(sudoku2).not.toBe(sudoku1);
  });
});
