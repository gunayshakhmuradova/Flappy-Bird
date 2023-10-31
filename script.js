"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bird = new Image();
bird.src = 'assets/bird.png';

const bg = new Image();
bg.src = 'assets/bg.png';

const pipeUp = new Image();
pipeUp.src = 'assets/pipeNorth.png';

const pipeDown = new Image();
pipeDown.src = 'assets/pipeSouth.png';

const gravity = 1;
const jumpStrength = 20;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let gap = 200;
let pipeX = canvas.width;
let pipeWidth = 52;
let pipeHeight = 320;
let score = 0;
let gameInterval;

bird.onload = function () {
    startGame();
};

function startGame() {
    gameInterval = setInterval(updateGameArea, 20);
}

function updateGameArea() {
    birdVelocity += gravity;
    birdY += birdVelocity;

    if (birdY < 0) {
        birdY = 0;
    }

    if (birdY + bird.height > canvas.height) {
        birdY = canvas.height - bird.height;
        endGame();
    }

    if (pipeX < -pipeWidth) {
        pipeX = canvas.width;
        score++;
    }

    if (collision()) {
        endGame();
        return;
    }

    pipeX -= 2;

    drawBackground();
    drawPipe();
    drawBird();
    drawScore();
}

function drawBackground() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function drawPipe() {
    ctx.drawImage(pipeUp, pipeX, 0, pipeWidth, pipeHeight);
    ctx.drawImage(pipeDown, pipeX, pipeHeight + gap, pipeWidth, canvas.height - pipeHeight - gap);
}

function drawBird() {
    ctx.drawImage(bird, 50, birdY, bird.width, bird.height);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        jump();
    }
});

function jump() {
    birdVelocity = -jumpStrength;
}



function collision() {
    if (
        birdY + bird.height > pipeHeight ||
        birdY < pipeHeight - gap ||
        birdY + bird.height > canvas.height
    ) {
        if (50 + bird.width > pipeX && 50 < pipeX + pipeWidth) {
            return true;
        }
    }
    return false;
}

function endGame() {
    clearInterval(gameInterval);
    ctx.fillStyle = "black";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
}
