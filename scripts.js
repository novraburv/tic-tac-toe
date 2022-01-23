"use strict"

// This module saves and edit board's data
const gameBoard = (() => {
	let board = new Array(9);

	function getBoard() {
		return board;
	}
	function getCell(index) {
		return board[index];
	}
	function setCell(index, value) {
		board[index] = value;
	}
	function reset() {
		board = new Array(9);
	}
	return { getBoard, getCell, setCell, reset }
})();

// Module to control its UI
// Must be able to:
// 	make each cells clickable;
// 	update the game board;
// 	make reset button works;
const displayController = (() => {
	const board = document.querySelector('.board');
	const cells = board.querySelectorAll('.cell');
	const resetButton = document.querySelector('.btn-reset');
	const activePlayer = document.querySelector('.activePlayer');

	function updateBoard() {
		cells.forEach(cell => {
			cell.textContent = gameBoard.getCell(cell.dataset.index);
		})
	}
	function startUp() {
		cells.forEach(cell => {
			cell.addEventListener('click', clickCell);
		})
		resetButton.addEventListener('click', reset)
	}
	function clickCell(e) {
		if (gameBoard.getCell(e.target.dataset.index)) return;
		gameBoard.setCell(e.target.dataset.index, gameController.getPlayer());
		updateBoard();
		updateActivePlayer();
	}
	function reset() {
		gameBoard.reset();
		updateBoard();
		gameController.setPlayer('X');
		activePlayer.textContent = gameController.getPlayer();
	}
	function updateActivePlayer() {
		gameController.changePlayer();
		activePlayer.textContent = gameController.getPlayer();
	}
	return { updateBoard, startUp }
})();

// This module control the flow of this game
// must be able to:
// 	change active player;
// 	evaluate whether the game is completed or not;
const gameController = (() => {
	let player = 'X';

	function getPlayer() {
		return player;
	}
	function setPlayer(value) {
		player = value;
	}
	function changePlayer() {
		if (player === 'X') {
			player = 'O';
		} else {
			player = 'X';
		}
	}
	return { getPlayer, setPlayer, changePlayer }
})();


displayController.startUp();