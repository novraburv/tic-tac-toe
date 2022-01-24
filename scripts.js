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
	const nextButton = document.querySelector('.btn-next');
	const activePlayer = document.querySelector('.activePlayer');
	const winningBanner = document.querySelector('.winning-announcement');
	const winningMsg = document.querySelector('.winning-message');

	function updateBoard() {
		cells.forEach(cell => {
			cell.textContent = gameBoard.getCell(cell.dataset.index);
		})
	}
	function startUp() {
		cells.forEach(cell => {
			cell.addEventListener('click', clickCell);
		})
		resetButton.addEventListener('click', reset);
		nextButton.addEventListener('click', next);
	}
	function clickCell(e) {
		if (gameBoard.getCell(e.target.dataset.index)) return;
		gameBoard.setCell(e.target.dataset.index, gameController.getPlayer());
		updateBoard();
		updateActivePlayer();
		checkWinner();
	}
	function reset() {
		gameBoard.reset();
		updateBoard();
		gameController.setPlayer('X');
		activePlayer.textContent = gameController.getPlayer();
	}
	function next() {
		reset();
		winningBanner.style.display = 'none';
	}
	function updateActivePlayer() {
		gameController.changePlayer();
		activePlayer.textContent = gameController.getPlayer();
	}
	function checkWinner() {
		const result = gameController.evaluate();
		if (!result) return;
		winningMsg.innerHTML = '';
		if (result === 'X') {
			winningMsg.innerHTML = `Congratulation! <span class="activePlayer">${result}</span> won this round.`;
		}
		if (result === 'O') {
			winningMsg.innerHTML = `How unfortunate! <span class="activePlayer">${result}</span> won this round.`;
		}
		winningBanner.style.display = 'flex';
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
	function evaluate() {
		const winPosition = ['012','345','678','036','147','258','048','246'];
		const board = gameBoard.getBoard();
		let XPos = '';
		let OPos = '';
		let winner = undefined;
		for (let i = 0; i < board.length; i++) {
			if (board[i] === 'X') XPos += i;
			if (board[i] === 'O') OPos += i;
		}
		winPosition.forEach(pos => {
			if (pos.split('').every(index => XPos.includes(index))) winner = 'X';
			if (pos.split('').every(index => OPos.includes(index))) winner = 'O';
		})
		return winner;
	}
	return { getPlayer, setPlayer, changePlayer, evaluate }
})();


displayController.startUp();