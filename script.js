
const gameContainer = document.getElementById('game-container');
const ball = document.getElementById('ball');
const pauseButton = document.getElementById('pause-button');
const menuButton = document.getElementById('menu-button');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlay-text');
const gameOverOverlay = document.getElementById('game-over-overlay');
const scoreElement = document.getElementById('score');
const gameoverScoreElement = document.getElementById('game-over-score');
const playAgainButton = document.getElementById('play-again-button');
let score = 0;
let isPaused = false;
let cubeCreationInterval;
let cubes = [];


function hideInstruction() {
const instruction = document.getElementById("instruction");
instruction.classList.add("hidden");
}

// Hide the instruction after 4 seconds
setTimeout(hideInstruction, 4000);

function createCube() {
    if (isPaused) {
        return;
    }

    const cube = document.createElement('div');
    cube.className = 'cube';
    cube.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px';
    cube.style.top = '-50px';
    gameContainer.appendChild(cube);
    cubes.push(cube);

    const cubeFallInterval = setInterval(() => {
        if (isPaused) {
            return;
        }

        const cubeRect = cube.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (isCollision(cubeRect, ballRect)) {
            clearInterval(cubeFallInterval);
            cube.remove();
            endGame();
        } else if (cubeRect.top >= window.innerHeight) {
            clearInterval(cubeFallInterval);
            cube.remove();
            score++;
            updateScoreDisplay();
        } else {
            cube.style.top = cubeRect.top + 20 + 'px';
        }
    }, 20);
}

function isCollision(rect1, rect2) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

function endGame() {
    // Display the game over overlay
    gameoverScoreElement.textContent = score;
    gameOverOverlay.style.display = 'block';
    isPaused = true; // Pause the game
    clearInterval(cubeCreationInterval);
}

function updateScoreDisplay() {
    scoreElement.textContent = `Score: ${score}`;
}

playAgainButton.addEventListener('click', () => {
    // Hide the game over overlay, reset the score, and resume the game
    gameOverOverlay.style.display = 'none';
    score = 0;
    updateScoreDisplay();
    togglePause();
     // Show the instruction again
const instruction = document.getElementById("instruction");
instruction.classList.remove("hidden");

setTimeout(() => {
instruction.classList.add("hidden");
}, 4000);
});

gameContainer.addEventListener('mousemove', (e) => {
    if (!isPaused) {
        const ballRect = ball.getBoundingClientRect();
        const ballNewX = e.clientX - gameContainer.getBoundingClientRect().left - ballRect.width / 2;

        if (ballNewX >= 0 && ballNewX <= gameContainer.clientWidth - ballRect.width) {
            ball.style.left = ballNewX + 'px';
        }
    }
});

function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(cubeCreationInterval);
        pauseButton.textContent = 'Resume';
        overlay.style.display = 'block';
        overlayText.textContent = 'Paused - Click Anywhere to Resume';

        cubes.forEach(cube => {
            clearInterval(cube.fallInterval);
        });
    } else {
        cubeCreationInterval = setInterval(() => {
            createCube();
        }, 2000);
        pauseButton.textContent = 'Pause';
        overlay.style.display = 'none';
    }
}

pauseButton.addEventListener('click', togglePause);
menuButton.addEventListener('click', showMenu);
overlay.addEventListener('click', togglePause);

function showMenu() {
    // Redirect to the menu page
    window.location.href = 'menu.html';
}

cubeCreationInterval = setInterval(() => {
    createCube();
}, 2000);





