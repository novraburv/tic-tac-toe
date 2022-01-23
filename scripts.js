"use strict"

const gameBoard = (() => {
	const board = new Array(9);

	function getBoard() {
		return board;
	}
	function getCell(index) {
		return board[index];
	}
	function setCell(index, value) {
		board[index] = value;
	}
	return { getBoard, getCell, setCell }
})();

// Module to control its UI
// Must be able to:
// 	make each cells clickable;
// 	update the game board;
// 	make reset button works;
const displayController = (() => {
	const board = document.querySelector('.board');
	const cells = board.querySelectorAll('.cell');

	function updateBoard() {
		cells.forEach(cell => {
			cell.textContent = gameBoard.getCell(cell.dataset.index);
		})
	}
	function startUp() {
		cells.forEach(cell => {
			cell.addEventListener('click', clickCell);
		})
	}
	function clickCell(e) {
		gameBoard.setCell(e.target.dataset.index, 'FT');
		updateBoard();
	}
	return { updateBoard, startUp }
})();
const gameController = (() => {})();


displayController.startUp();