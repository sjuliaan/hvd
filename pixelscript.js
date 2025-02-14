const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rows = 10;
const cols = 13;
const tileSize = 40;

canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

// Load images
const wallImage = new Image();
wallImage.src = "wall.png";

const walkwayImage = new Image();
walkwayImage.src = "walkway.png";

const playerImage = new Image();
playerImage.src = "bmo.gif"; // BMO as the player

const whiteHeartImage = new Image();
whiteHeartImage.src = "https://media.tenor.com/wnVuzMq9fYsAAAAi/love-heart.gif"; // White heart GIF for winning

const keyImage = new Image();
keyImage.src = "key.gif"; // Key image

// Maze definition (1 = wall, 0 = walkway)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Initial positions
const player = { x: 6, y: 4 };       // Player starting position
const whiteHeartPos = { x: 11, y: 8 }; // White heart position (winning point)
const keyPos = { x: 1, y: 1 };  // Key position

let gameStarted = false;
let hasKey = false;

// Draw the maze function
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.drawImage(wallImage, x * tileSize, y * tileSize, tileSize, tileSize);
            } else {
                ctx.drawImage(walkwayImage, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw the white heart (goal)
    ctx.drawImage(whiteHeartImage, whiteHeartPos.x * tileSize, whiteHeartPos.y * tileSize, tileSize, tileSize);

    // Draw the key if BMO hasn't collected it yet (centered to the tile)
    if (!hasKey) {
        ctx.drawImage(
            keyImage, 
            keyPos.x * tileSize - (tileSize * 0.25), // Adjust X position
            keyPos.y * tileSize - (tileSize * 0.25), // Adjust Y position
            tileSize * 1.5, // Enlarged width
            tileSize * 1.5  // Enlarged height
        );
    }

    // Draw the player
    ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Move player
function movePlayer(dx, dy) {
    if (!gameStarted) return;

    let newX = player.x + dx;
    let newY = player.y + dy;

    // Check within boundaries and not a wall
    if (
        newX >= 0 &&
        newX < cols &&
        newY >= 0 &&
        newY < rows &&
        maze[newY][newX] === 0
    ) {
        player.x = newX;
        player.y = newY;

        // Check if BMO picks up the key
        if (player.x === keyPos.x && player.y === keyPos.y) {
            hasKey = true;
        }

        // Win condition (BMO must have the key to enter the heart)
        if (player.x === whiteHeartPos.x && player.y === whiteHeartPos.y && hasKey) {
            showWinContent();
        }

        drawMaze();
    }
}

// Show win content
function showWinContent() {
    // Create a pop-up div
    let winPopup = document.createElement("div");
    winPopup.id = "win-popup";
    winPopup.style.position = "fixed";
    winPopup.style.top = "50%";
    winPopup.style.left = "50%";
    winPopup.style.transform = "translate(-50%, -50%)";
    winPopup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    winPopup.style.color = "white";
    winPopup.style.padding = "20px";
    winPopup.style.textAlign = "center";
    winPopup.style.borderRadius = "10px";
    winPopup.style.boxShadow = "0 0 10px white";
    winPopup.style.zIndex = "1000";

    // Message inside the pop-up
    let message = document.createElement("p");
    message.innerText = "YAYY!! MWEHHEHEHE PANALO 🎉";
    message.style.fontSize = "20px";
    message.style.marginBottom = "15px";

    // Button to go to the next page
    let nextPageButton = document.createElement("button");
    nextPageButton.innerText = "Click mo itey! :D";
    nextPageButton.style.padding = "10px 20px";
    nextPageButton.style.fontSize = "16px";
    nextPageButton.style.border = "none";
    nextPageButton.style.borderRadius = "5px";
    nextPageButton.style.cursor = "pointer";
    nextPageButton.style.backgroundColor = "white";
    nextPageButton.style.color = "black";
    nextPageButton.style.boxShadow = "0 0 5px white";

    // Redirect when the button is clicked
    nextPageButton.onclick = function() {
        window.location.href = "valentine-success.html";
    };

    // Append message and button to the pop-up
    winPopup.appendChild(message);
    winPopup.appendChild(nextPageButton);

    // Append pop-up to the document body
    document.body.appendChild(winPopup);
}

// Start game
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    gameStarted = true;
    player.x = 6;
    player.y = 4;
    hasKey = false;
    document.getElementById("bg-music").play(); // Play background music
    drawMaze();
}


// Keyboard events
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":    movePlayer(0, -1); break;
        case "ArrowDown":  movePlayer(0,  1); break;
        case "ArrowLeft":  movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1,  0); break;
    }
});

// On images load, draw the maze
wallImage.onload = drawMaze;
walkwayImage.onload = drawMaze;
playerImage.onload = drawMaze;
whiteHeartImage.onload = drawMaze;
keyImage.onload = drawMaze;
