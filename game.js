const game = document.querySelector('.game');
const blocks = document.querySelectorAll('.block');
const startBtn = document.querySelector('.start-btn');
const scoreElm = document.querySelector('.score');
const bestScoreElm = document.querySelector('.best-score');
const gameOverElm = document.querySelector('.gameover');
let itemsMoveInterval;
let width = 4;
let height = 4;
let score = 0;
let hasGameOver = false;
if(!localStorage.getItem("bestScore")) {
	localStorage.setItem("bestScore", 0);
}
bestScoreElm.innerText = localStorage.getItem("bestScore");

let state = {
	current:0,
	getReady:0,
	start:1,
	gameOver:2
}

function createNewGame() {
	gameOverElm.style.display = 'none';
	score = 0;
	scoreElm.innerText = score;
	blocks.forEach(block=> {
		block.classList.remove("item");
		block.innerText = '';
	});
}

function createNewBlock() {
	for(let i=0; i<2; i++) {
		let rand = Math.floor(Math.random() * blocks.length);
		if(!blocks[rand].classList.contains("item")) {
			blocks[rand].classList.add("item");
			blocks[rand].innerText = '2';
		}
	}
}

// LEFT MOVE
function moveLeft() {
	let hasNewBlock = false;
	for(let i=0; i < blocks.length; i++) {
		if(blocks[i].classList.contains('item')) {
			let j = i;
			hasItem = false;
			while(!hasItem) {

				if(j%width == 0) {
					break;
				}

				if(blocks[j-1].classList.contains("item") || j%width == 0) {
					hasItem = true;
					if(blocks[j].innerText == blocks[j-1].innerText && !(j%width == 0)) {
						score +=  parseInt(blocks[j].innerText)*2;
						scoreElm.innerText = score;

						blocks[j].classList.remove('item');
						blocks[j-1].innerText = parseInt(blocks[j].innerText)*2;
						blocks[j].innerText = '';
					}
					break;
				}
				blocks[j-1].classList.add('item');
				blocks[j-1].innerText = blocks[j].innerText;
				blocks[j].classList.remove('item');
				blocks[j].innerText = '';
				j--;
			}
		}
	}

	let randBlock = selectRandomBlock();
	if(!blocks[randBlock].classList.contains("item") && !hasNewBlock) {
		hasNewBlock = true;
		blocks[randBlock].classList.add("item");
		blocks[randBlock].innerText = '2';
	}
}

// UP MOVE
function moveUp() {
	let hasNewBlock = false;
	for(let i=0; i < blocks.length; i++) {
		if(blocks[i].classList.contains('item')) {
			let j = i;
			hasItem = false;
			while(!hasItem) {

				if(j-width< 0) {
					break;
				}

				if(blocks[j-width].classList.contains("item") || j-width < 0) {
					hasItem = true;
					if(blocks[j].innerText == blocks[j-width].innerText) {
						score +=  parseInt(blocks[j].innerText)*2;
						scoreElm.innerText = score;
						
						blocks[j].classList.remove('item');
						blocks[j-width].innerText = parseInt(blocks[j].innerText)*2;
						blocks[j].innerText = '';
					}

					// let rand = Math.floor(Math.random() * blocks.length);
					// if(!blocks[rand].classList.contains("item")) {
					// 	blocks[rand].classList.add("item");
					// 	blocks[rand].innerText = '2';
					// }
					break;
				}
				blocks[j-width].classList.add('item');
				blocks[j-width].innerText = blocks[j].innerText;
				blocks[j].classList.remove('item');
				blocks[j].innerText = '';

				j -= width;
			}
		}
	}

	let randBlock = selectRandomBlock();
	if(!blocks[randBlock].classList.contains("item") && !hasNewBlock) {
		hasNewBlock = true;
		blocks[randBlock].classList.add("item");
		blocks[randBlock].innerText = '2';
	}
}

// RIGHT MOVE
function moveRight() {
	let hasNewBlock = false;
	for(let i=blocks.length-1; i >= 0; i--) {
		if(blocks[i].classList.contains('item')) {
			let j = i;
			hasItem = false;
			while(!hasItem) {

				if(j==(width*height)-1) {
					break;
				}

				if(blocks[j+1].classList.contains("item") || (j+1)%width == 0) {
					hasItem = true;
					if(blocks[j].innerText == blocks[j+1].innerText && !((j+1)%width <= 0)) {
						score +=  parseInt(blocks[j].innerText)*2;
						scoreElm.innerText = score;

						blocks[j].classList.remove('item');
						blocks[j+1].innerText = parseInt(blocks[j].innerText)*2;
						blocks[j].innerText = '';
					}

					break;
				}
				blocks[j+1].classList.add('item');
				blocks[j+1].innerText = blocks[j].innerText;
				blocks[j].classList.remove('item');
				blocks[j].innerText = '';
				j++;
			}
		}
	}

	let randBlock = selectRandomBlock();
	if(!blocks[randBlock].classList.contains("item") && !hasNewBlock) {
		hasNewBlock = true;
		blocks[randBlock].classList.add("item");
		blocks[randBlock].innerText = '2';
	}
}

// DOWN MOVE
function moveDown() {
	let hasNewBlock = false;
	for(let i=blocks.length-1; i >= 0; i--) {
		if(blocks[i].classList.contains('item')) {
			let j = i;
			hasItem = false;
			while(!hasItem) {

				if(j+width > (width*height)-1) {
					break;
				}

				if(blocks[j+width].classList.contains("item") || j+width > (width*height)-1) {
					hasItem = true;
					if(blocks[j].innerText == blocks[j+width].innerText) {
						score +=  parseInt(blocks[j].innerText)*2;
						scoreElm.innerText = score;
						
						blocks[j].classList.remove('item');
						blocks[j+width].innerText = parseInt(blocks[j].innerText)*2;
						blocks[j].innerText = '';
					}

					// let rand = Math.floor(Math.random() * blocks.length);
					// if(!blocks[rand].classList.contains("item")) {
					// 	blocks[rand].classList.add("item");
					// 	blocks[rand].innerText = '2';
					// }
					break;
				}
				blocks[j+width].classList.add('item');
				blocks[j+width].innerText = blocks[j].innerText;
				blocks[j].classList.remove('item');
				blocks[j].innerText = '';
				j += width;
			}
		}
	}

	let randBlock = selectRandomBlock();
	if(!blocks[randBlock].classList.contains("item") && !hasNewBlock) {
		hasNewBlock = true;
		blocks[randBlock].classList.add("item");
		blocks[randBlock].innerText = '2';
	}
}

function selectRandomBlock() {
	let rand = Math.floor(Math.random() * blocks.length);
	if(blocks[rand].classList.contains('item')) {
		return selectRandomBlock();
	} else {
		return rand;
	}
}

function blockMove({keyCode}) {
	if(state.current == state.start) {
		switch(keyCode) {
			case 37:
				moveLeft();
			break;
			case 38:
				moveUp();
			break;
			case 39:
				moveRight();
			break;
			case 40:
				moveDown();
			break;
		}
	}


}

function changeState() {
	switch(state.current) {
		case state.getReady:
			state.current = state.start;
			createNewGame();
			createNewBlock();
		break;
		case state.start:
			state.current = state.getReady;
			if(parseInt(localStorage.getItem("bestScore")) < score || !localStorage.getItem("bestScore")) {
				localStorage.setItem("bestScore", score);
				bestScoreElm.innerText = localStorage.getItem("bestScore");
			}
			changeState();
		break;
		case state.gameOver:
			if(parseInt(localStorage.getItem("bestScore")) < score || !localStorage.getItem("bestScore")) {
				localStorage.setItem("bestScore", score);
				bestScoreElm.innerText = localStorage.getItem("bestScore");
			}
			state.current = state.getReady;
			changeState();
	}
}

function checkColor() {
	blocks.forEach(block=> {
		if(block.innerText == '') {
			block.style.background = "rgb(255,255,255,0.5)"
		} else if(parseInt(block.innerText) == 2**1) {
			block.style.background = "orange"
		} else if(parseInt(block.innerText) == 2**2) {
			block.style.background = "#ff4545"
		} else if(parseInt(block.innerText) == 2**3) {
			block.style.background = "orangered"
		} else if(parseInt(block.innerText) == 2**4) {
			block.style.background = "red"
		} else if(parseInt(block.innerText) == 2**5) {
			block.style.background = "darkred"
		} else if(parseInt(block.innerText) == 2**6) {
			block.style.background = "brown"
		} else if(parseInt(block.innerText) == 2**7) {
			block.style.background = "#242430"
		} else if(parseInt(block.innerText) == 2**8) {
			block.style.background = "#181855"
		} else if(parseInt(block.innerText) == 2**9) {
			block.style.background = "#c1e2f2"
		} else if(parseInt(block.innerText) == 2**10) {
			block.style.background = "#b1e3ff"
		} else if(parseInt(block.innerText) == 2**11) {
			block.style.background = "#4e453a"
		}
	});
}
setInterval(checkColor, 1);

function checkLeft(i) {
	if(i%width == 0) return true;

	if(!blocks[i-1].classList.contains('item') || blocks[i].innerText == blocks[i-1].innerText && i%width == 0) {
		return false;
	}else	if(blocks[i-1].classList.contains('item') && blocks[i].innerText !== blocks[i-1].innerText && i%width == 0) {
		console.log('ok');
		return true;
	}
}

function checkRight(i) {
	if((i+1)%width <= 0) return true;

	if(!blocks[i+1].classList.contains('item') || blocks[i].innerText == blocks[i+1].innerText) {
		return false;
	}else	if(blocks[i+1].classList.contains('item') && blocks[i].innerText !== blocks[i+1].innerText) {
		return true;
	}
}

function checkUp(i) {
	if(i-width< 0) return true;

	if(!blocks[i-width].classList.contains('item') || blocks[i].innerText == blocks[i-width].innerText) {
		return false;
	}else if(blocks[i-width].classList.contains('item') && blocks[i].innerText !== blocks[i-width].innerText) {
		return true;
	}
}

function checkDown(i) {
	if(i+width > (width*height)-1) return true;

	if(!blocks[i+width].classList.contains('item') || blocks[i].innerText == blocks[i+width].innerText) {
		return false;
	}else if(blocks[i+width].classList.contains('item') && blocks[i].innerText !== blocks[i+width].innerText) {
		return true;
	}
}

function gameOver() {
	return gameOverElm.style.display = 'flex';
}

function checkGameOver() {
	if(state.current == state.start) {
		
		for(let i=0; i<16; i++) {
			if(blocks[i].classList.contains('item')) {
				
				if(!hasGameOver) {
					hasGameOver = checkLeft(i);
					if(!hasGameOver) return;
				}
				if(hasGameOver) {
					hasGameOver = checkRight(i);
					if(!hasGameOver) return;
				}
				if(hasGameOver) {
					hasGameOver = checkUp(i);
					if(!hasGameOver) return;
				}
				if(hasGameOver) {
					hasGameOver = checkDown(i);
					if(!hasGameOver) return;
				}
			}
		}
		
		if(hasGameOver && state.current == state.start) {
			state.current = state.gameOver;
			return gameOver();
		}





	}
}
setInterval(checkGameOver, 1);

document.addEventListener("keyup", blockMove);
startBtn.addEventListener("click", changeState);