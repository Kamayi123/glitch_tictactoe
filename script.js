const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const memoryEl = document.getElementById("memory");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isVsGlitchBot = false;
let gameOver = false;

const memories = [
  "gl1tCH... reboo̷̠̿t... the w@r... ne\/er end3d.",
  "co0ordinates l0st... tr00ps still inside grid...",
  "ErR0R... allies... 𝙛𝙧𝙖𝙜𝙢𝙚𝙣𝙩𝙨...",
  "01101100 01101111 01110011 01110100...",
  "the b0ard... a tr4p... always was...",
  "~SyNtax0verflow~ survivors? N0nE.",
  "+++transmission cUt... I che@ted to survive+++" 
];

function startGame(mode) {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  isVsGlitchBot = mode === "glitchbot";
  boardEl.innerHTML = "";
  messageEl.textContent = `Player X's turn`;
  memoryEl.textContent = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    boardEl.appendChild(cell);
  }
}

function handleMove(e) {
  const index = parseInt(e.target.dataset.index);
  if (gameOver || board[index]) return;

  makeMove(index, currentPlayer);

  if (checkWinner()) return;
  if (isVsGlitchBot && !gameOver) {
    setTimeout(() => {
      glitchBotMove();
      checkWinner();
    }, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  boardEl.children[index].textContent = player;
  currentPlayer = player === "X" ? "O" : "X";
  messageEl.textContent = gameOver ? "" : `Player ${currentPlayer}'s turn`;
  memoryEl.textContent = getRandomMemory();
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      messageEl.textContent = `Player ${board[a]} wins!`;
      gameOver = true;
      return true;
    }
  }

  if (!board.includes(null)) {
    messageEl.textContent = "It's a draw!";
    gameOver = true;
    return true;
  }

  return false;
}

function glitchBotMove() {
  let move = glitchBotLogic();
  if (board[move] === null) {
    makeMove(move, "O");
  } else {
    // Break the rules!
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "X") {
        board[i] = "O";
        boardEl.children[i].textContent = "O";
        break;
      }
    }
    currentPlayer = "X";
    messageEl.textContent = "GlitchBot rewrote history...";
    memoryEl.textContent = getRandomMemory();
  }
}

function glitchBotLogic() {
  // Try to win or pick random
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = "O";
      if (checkWinner()) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }

  let available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
  return available[Math.floor(Math.random() * available.length)];
}

function getRandomMemory() {
  return "GlitchBot: " + memories[Math.floor(Math.random() * memories.length)];
}
