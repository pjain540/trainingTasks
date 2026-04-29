function solveNQueens(n) {
    const result = [];

    // Track columns and diagonals
    const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col

    // Create empty board
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    function backtrack(row) {
        // If all queens placed
        if (row === n) {
            result.push(board.map(r => r.join("")));
            return;
        }

        for (let col = 0; col < n; col++) {
            // Check if safe
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // Move to next row
            backtrack(row + 1);

            // Undo (backtrack)
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return result;
}