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
const displayController = (() => {})();
const gameController = (() => {})();