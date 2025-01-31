import { useEffect, useState } from "react";
import Square from "./Square";


/* ================== */
// game state array,
// basically original
// tic tac toe table
/* ================== */
const GAME_STATE = ["", "", "", "", "", "", "", "", ""]

/* ================== */
// game matches array,
// we'll loop this in
// order to find a winner
/* ================== */
const GAME_MATCHES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


type Scores = {
  [key: string]: number
}

/* ================== */
// initial score for
// each player (0 and 0)
/* ================== */
const INITIAL_SCORES: Scores = {
  X: 0, O: 0
}


function Game() {


  /* ================== */
  // initializing
  // game state,
  // player and
  // initial score hook
  /* ================== */
  const [gameState, setGameState] = useState(GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [score, setScore] = useState(INITIAL_SCORES);


  /* ================== */
  // checking if there's
  // a score saved on
  // local storage
  /* ================== */
  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScore(JSON.parse(storedScores));
    }
  }, [])


  /* ================== */
  // hook to check victory
  // and change player 
  // every time "gameState"
  // var is updated. 
  /* ================== */
  useEffect(() => {
    if (gameState === GAME_STATE){
      return
    }
    checkVictory();
  }, [gameState])

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkVictory = () => {
    let hasWinner = false;

    for (let i = 0; i < GAME_MATCHES.length; i++) {
      const possibleMatch = GAME_MATCHES[i];

      let first = gameState[possibleMatch[0]]
      let second = gameState[possibleMatch[1]]
      let third = gameState[possibleMatch[2]]

      // check if any value is empty
      if ([first, second, third].includes("")) {
        continue
      }

      // check if there's a possible match
      // if so, break the loop
      if (first === second && second === third) {
        hasWinner = true;
        break
      }
    }

    // check for a winner or if it ended in a draw

    if (hasWinner) {
      setTimeout(() => showWinner(), 500);
      return
    }

    if (!gameState.includes("")) {
      setTimeout(() => showDraw(), 500);
      return
    }

    changePlayer();
  }

  const resetBoard = () => setGameState(GAME_STATE);

  const showWinner = () => {
    window.alert(`Hey ${currentPlayer} you won.`);

    // update player's score
    const playerScore = score[currentPlayer] + 1;
    const newScores = { ...score };
    newScores[currentPlayer] = playerScore;
    setScore(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  }

  const showDraw = () => {
    window.alert(`There's no winner in this round.`);
    resetBoard();
  }


  /* ================== */
  // method to get player's
  // selected square and
  // update it
  /* ================== */
  const handlePlayerMove = (event: any) => {
    const squareIndex = Number(event.target.getAttribute("data-cell-index"));
    const currentValue = gameState[squareIndex];

    // check if square is empty
    if (currentValue) {
      return
    }

    // create new array duplicating
    // the original one, then setting
    // player movement.
    const newValues = [...gameState];
    newValues[squareIndex] = currentPlayer;
    setGameState(newValues);
  }



  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="font-lobster text-center text-5xl mb-4 text-white">
        I've played this game before...
      </h1>

      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (

            /// same as <Square key={index} player={player} />
            <Square
              key={index}
              onClick={handlePlayerMove}
              {... { index, player }}
            />

          ))}
        </div>

        <div className="mx-auto w-96 text-2xl text-serif">
          <p className="text-white mt-5">It's your turn, <span> {currentPlayer} !</span></p>
          <p className="text-white mt-5">Player X wins: <span> {score["X"]} </span></p>
          <p className="text-white mt-5">Player O wins: <span> {score["O"]} </span></p>
        </div>
      </div>
    </div>
  );
}

export default Game;
