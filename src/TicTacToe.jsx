import React, { useEffect } from 'react';
import './App.css';
import { nextMove, checkDraw, checkWinner } from './utils';

function TicTacToe() {

    const [board, setBoard] = React.useState(Array(9).fill(null));
    const [size, setSize] = React.useState(3);
    const [playerTurn, setPlayerTurn] = React.useState(null);
    const [humanIs, setHumanIs] = React.useState(null);
    const [method, setMethod] = React.useState('negamax');
    const [thinking, setThinking] = React.useState(false);



    const clearBoard = () => {
        setBoard(Array(size * size).fill(null));
    }


    const newGame = () => {
        clearBoard();
        setPlayerTurn(null);
        setHumanIs(null);
        const boardStyle = document.querySelector('.board');
        boardStyle.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        boardStyle.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    }
    const cellPressed = (index) => {
        let newBoard = [...board];
        if (newBoard[index] === null) {
            newBoard[index] = playerTurn;
            setBoard(newBoard);
            setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
        }
    }

    useEffect(() => {
        newGame();
    }
    , [size]);
    useEffect(() => {
        if(humanIs === null) return;
        setPlayerTurn('X');
    }
    , [humanIs]);
    useEffect(() => {
        if(board === undefined) return;
        if(humanIs === null) return;
        // Should make computer move
        if (playerTurn !== humanIs){
            setThinking(true);
            console.log('Thinking ...');
            let index = nextMove(board, method, playerTurn)
            cellPressed(index);
        }
    }
    , [playerTurn]);

    useEffect(() => {
        if(humanIs === null) return;
        const winner = checkWinner(board);
        if (winner) {
            let whoWon = winner === humanIs ? 'You' : 'Computer';
            setTimeout(function() {
                alert(`${whoWon} won!`);
                newGame();
            }, 200); // Adjust the delay as needed
        }else if (checkDraw(board)) {
            setTimeout(function() {
                alert('It\'s a draw!');
                newGame();
            }, 200); // Adjust the delay as needed
            
        }
    }
    , [board]);

    const handlePlayerPress = (index) => {
        if (playerTurn === humanIs) {
            cellPressed(index);
        }
    }
    return (
        <>
        {humanIs === null && 
        
            <div className='overlay'>
                <div className='overlay-content'>
                    <p>Welcome to this classic game of Tic Tac Toe! Choose your symbol and challenge yourself against my AI, powered by the negamax algorithm.</p>
                    <h3>Choose your side</h3>
                    <div className='options'>
                        <button onClick={() => {
                            setHumanIs('X');
                        }}>X</button>
                        <button onClick={() => {
                            setHumanIs('O');
                        }}>O</button>
                    </div>
                </div>
                
            </div>
        }
       
       <h4> You are playing as {humanIs}</h4>
        <select
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
        >
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            <option value={7}>7x7</option>
        </select>

        <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
        >
            <option value='random'>Random</option>
            <option value='negamax'>Negamax</option>
        </select>
        <div className='board'>
            {board.map((cell, index) => (
                <div 
                    className='cell' 
                    key={index}
                    onClick={() => handlePlayerPress(index)}
                >
                    {cell}
                </div>
            ))}
        </div>
        <button onClick={newGame}>New Game</button>
        </>
    )
}

export default TicTacToe;