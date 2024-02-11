let blockSize = 25;
let row = 20;
let col = 20;
let board;
let context;

let SnakeX = blockSize * 5;
let SnakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let foodX;
let foodY;

let snakeBody = [];

let gameover = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = row * blockSize;
  board.width = col * blockSize;
  context = board.getContext("2d");
  placefood();
  document.addEventListener("keyup", changeDirection);

  setInterval(update, 1000 / 10);
};

function update() {
  if (gameover) {
    return;
  }
  context.fillStyle = "#0e0d0d";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "#72bbf2";
  context.fillRect(SnakeX, SnakeY, blockSize, blockSize);

  if (SnakeX == foodX && SnakeY == foodY) {
    snakeBody.push(foodX, foodY);
    placefood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody = [i - 1].slice();
  }
  if (snakeBody.length) {
    snakeBody[0] = [SnakeX, SnakeY];
  }

  SnakeX += velocityX * blockSize;
  SnakeY += velocityY * blockSize;

  context.fillStyle = "green";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    SnakeX < 0 ||
    SnakeX >= col * blockSize ||
    SnakeY < 0 ||
    SnakeY >= row * blockSize
  ) {
    gameover = true;
    alert("Game Over");
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (SnakeX == snakeBody[i][0] && SnakeY == snakeBody[i - 1]) {
      gameover = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placefood() {
  foodX = Math.floor(Math.random() * col) * blockSize;
  foodY = Math.floor(Math.random() * row) * blockSize;
}
