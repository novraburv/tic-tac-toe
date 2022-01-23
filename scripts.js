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
		gameBoard.setCell(e.target.dataset.index, 'FT');
		updateBoard();
	}
	function reset() {
		gameBoard.reset();
		updateBoard();
	}
	return { updateBoard, startUp }
})();
const gameController = (() => {})();


displayController.startUp();