



function randomMove(board){
    let emptyCells = [];
    for(let i = 0; i < board.length; i++){
        if(board[i] === null){
            emptyCells.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function negamax(board, player, depth, alpha = -Infinity, beta = Infinity){
    let winner = checkWinner(board);
    if(winner !== null || checkDraw(board) || depth === 0){
        let turnFactor = player === 'X' ? 1 : -1;
        return {value: evaluate(board) * Math.max(1,depth) * turnFactor, move: null, depth: depth};
    }
    let bestValue = -Infinity;
    let bestMove = null;
    let bestDepth = -1;
    for(let i = 0; i < board.length; i++){
        if(board[i] === null){
            let newBoard = board.slice();
            newBoard[i] = player;
            let nextPlayer = player === 'X' ? 'O' : 'X';
            let result = negamax(newBoard, nextPlayer, depth - 1, -beta, -alpha);
            let value = -result.value;
            if(value > bestValue){
                bestValue = value;
                bestMove = i;
                bestDepth = result.depth;
            }

            alpha = Math.max(alpha, value);
            if(alpha >= beta){
                break;
            }
        }
    }
    return {value: bestValue, move: bestMove, depth: bestDepth};
}

function evaluate(board){
    let winner = checkWinner(board);
    if(winner === 'X'){
        return 1;
    }else if(winner === 'O'){
        return -1;
    }else{
        return 0;
    }
}
export function nextMove(board, method, player){
    console.log('nextMove');
    switch(method){
        case 'random':
            return randomMove(board);
        case 'negamax':
            let result = negamax(board, player, 6);
            return result.move;
    }

}

export function checkDraw(board){
    if (board === undefined) {
        return false;
    }
    for (let cell of board) {
        if (cell === null) {
            return false;
        }
    }
    return true;
}

export function checkWinner(board){
    if (board === undefined) {
        return null;
    }
    // Check rows
    let size = Math.sqrt(board.length);
    for (let i = 0; i < size * size; i += size) {
        let row = board.slice(i, i + size);
        if (row.every(cell => cell === row[0])) {
            return row[0];
        }
    }
    // Check columns
    for (let i = 0; i < size; i++) {
        let column = [];
        for (let j = i; j < size * size; j += size) {
            column.push(board[j]);
        }
        if (column.every(cell => cell === column[0])) {
            return column[0];
        }
    }
    // Check diagonals
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < size * size; i += size + 1) {
        diagonal1.push(board[i]);
    }
    for (let i = size - 1; i < size * size - 1; i += size - 1) {
        diagonal2.push(board[i]);
    }
    if (diagonal1.every(cell => cell === diagonal1[0])) {
        return diagonal1[0];
    }
    if (diagonal2.every(cell => cell === diagonal2[0])) {
        return diagonal2[0];
    }
    return null;
}