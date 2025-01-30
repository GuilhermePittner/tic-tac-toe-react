import { useEffect, useState } from "react";
import Square from "./Square";


/* ================== */
// game state array,
// basically original
// tic tac toe table
/* ================== */
const GAME_STATE = ["", "", "", "", "", "", "", "", ""]


function Game() {


  /* ================== */
  // initializing
  // game state and 
  // player hook
  /* ================== */
  const [gameState, setGameState] = useState(GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");




  /* ================== */
  // hook to change player 
  // every time "gameState"
  // var is updated. 
  /* ================== */
  useEffect(() => {
    changePlayer();
  }, [gameState])

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
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
      </div>
    </div>
  );
}

export default Game;
