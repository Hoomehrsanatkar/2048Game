const game = document.querySelector('.game');
const blocks = document.querySelectorAll('.block');
const startBtn = document.querySelector('.start-btn');
const scoreElm = document.querySelector('.score');
const bestScoreElm = document.querySelector('.best-score');
let itemsMoveInterval;
let width = 4;
let height = 4;
let score = 0;
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
	for(let i=0; i < blocks.length; i++) {
		if(blocks[i].classList.contains('item')) {
			let j = i;
			hasItem = false;
			while(!hasItem) {

				if(j==0) {
					break;
				}

				if(blocks[j-1].classList.contains("item") || j%width == 0) {
					hasItem = true;
					if(blocks[j].innerText == blocks[j-1].innerText) {
						score +=  parseInt(blocks[j].innerText)*2;
						scoreElm.innerText = score;

						blocks[j].classList.remove('item');
						blocks[j-1].innerText = parseInt(blocks[j].innerText)*2;
						blocks[j].innerText = '';
					}

					let rand = Math.floor(Math.random() * blocks.length);
					if(!blocks[rand].classList.contains("item")) {
						blocks[rand].classList.add("item");
						blocks[rand].innerText = '2';
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
}

// UP MOVE
function moveUp() {
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

					let rand = Math.floor(Math.random() * blocks.length);
					if(!blocks[rand].classList.contains("item")) {
						blocks[rand].classList.add("item");
						blocks[rand].innerText = '2';
					}
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
}

// RIGHT MOVE
function moveRight() {
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
					if(blocks[j].innerText == blocks[j+1].innerText) {
						score +=  parseInt(blocks[j].innerText)*2;
						scoreElm.innerText = score;

						blocks[j].classList.remove('item');
						blocks[j+1].innerText = parseInt(blocks[j].innerText)*2;
						blocks[j].innerText = '';
					}

					let rand = Math.floor(Math.random() * blocks.length);
					if(!blocks[rand].classList.contains("item")) {
						blocks[rand].classList.add("item");
						blocks[rand].innerText = '2';
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
}

// DOWN MOVE
function moveDown() {
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

					let rand = Math.floor(Math.random() * blocks.length);
					if(!blocks[rand].classList.contains("item")) {
						blocks[rand].classList.add("item");
						blocks[rand].innerText = '2';
					}
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
}

// WHENE MATH TOW BLOCK
// WHENE NO MATH BLOCK 
// 

function blockMove({keyCode}) {
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
	}
}

function checkColor() {
	blocks.forEach(block=> {
		if(block.innerText == '') {
			block.style.background = "whitesmoke"
		} else if(parseInt(block.innerText) == 2**1) {
			block.style.background = "#cfb289"
		} else if(parseInt(block.innerText) == 2**2) {
			block.style.background = "#dec197"
		} else if(parseInt(block.innerText) == 2**3) {
			block.style.background = "#eecfa5"
		} else if(parseInt(block.innerText) == 2**4) {
			block.style.background = "#fddeb3"
		} else if(parseInt(block.innerText) == 2**5) {
			block.style.background = "orangered"
		} else if(parseInt(block.innerText) == 2**6) {
			block.style.background = "red"
		} else if(parseInt(block.innerText) == 2**7) {
			block.style.background = "darkred"
		} else if(parseInt(block.innerText) == 2**8) {
			block.style.background = "#d0e1e6"
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

document.addEventListener("keyup", blockMove);
startBtn.addEventListener("click", changeState);