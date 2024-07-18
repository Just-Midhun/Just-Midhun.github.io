const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highscore');

// Game Variables Initial Positions
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 150;
let gameStarted = false;

// Used to Draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

// Used to Draw Snake
function drawSnake() {
    snake.forEach(segment => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// Used to Draw Food
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Create Snake or Food
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set Position of Snake or Food on Game Board
function setPosition(element, position) {
    element.style.gridRowStart = position.y + 1;
    element.style.gridColumnStart = position.x + 1;
}

// Generate Food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return { x, y };
}

// Moving the snake
function move() {
    // capturing head from snake 0 value
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;

        case 'left':
            head.x--;
            break;

        case 'up':
            head.y--;
            break;

        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);

    // Condition for when you eat food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        updateScore(); // Update score after eating food
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }

    checkCollision();
}

// Start game Function
function startGame() {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        draw();
    }, gameSpeedDelay);
}

// Keypress Listener
function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === ' ')) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;

            case 'ArrowDown':
                direction = 'down';
                break;

            case 'ArrowLeft':
                direction = 'left';
                break;

            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 150;
    updateScore(); // Ensure the score is updated after resetting the snake
    draw(); // Draw the initial state of the game
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(4, '0');
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(4, '0');
    }
    highScoreText.style.display = 'block';
}
