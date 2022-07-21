import React, { useEffect, useState } from "react";
import "./App.css";

////Different winning conditions
//all column win
const getColumn = (list, n) => {
  let column = [];
  for (let i = 0; i < list.length; i++) {
    column.push(list[i][n]);
  }
  return column;
};
//diagonal wins
const getDiags = (list) => {
  let rdiag = [];
  let ldiag = [];
  for (let i = 0; i < list.length; i++) {
    rdiag.push(list[i][i]);
    ldiag.push(list[i][list.length - 1 - i]);
  }
  return [rdiag, ldiag];
};
//checks for first item in list that is incongruent
//checker will return true when all items are the same
const checkList = (list, item) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== item) {
      return false;
    }
  }
  return true;
};

////checks for a win through all methods
//executes function as true when win is detected
//else false if no method procures a win
const checkAll = (list, item) => {
  for (let i = 0; i < list.length; i++) {
    if (checkList(list[i], item)) {
      //checks rows
      return true;
    }
  }
  for (let i = 0; i < list.length; i++) {
    if (checkList(getColumn(list, i), item)) {
      //checks columns
      return true;
    }
  }
  let diags = getDiags(list);
  if (checkList(diags[0], item)) {
    //first element of diags = rdiag
    return true;
  }
  if (checkList(diags[1], item)) {
    //second element of diags = ldiag
    return true;
  }
  return false; //false when no wins
};

////produces an nxn array of items
const setArrays = (item, num) => {
  let arrays = [];
  for (let i = 0; i < num; i++) {
    arrays.push([]); //forms n rows
    for (let j = 0; j < num; j++) {
      arrays[i].push(item); //forms n items within rows
    }
  }
  return arrays; // returns nxn array of arrays of items
};

//Setting player turn
const playerTurn = (turn) => {
  if (turn % 2 === 0) {
    return "O";
  }
  return "X";
};

const GameBoard = () => {
  const [list, setList] = useState(setArrays("e", 3)); //state for gameboard
  const [turn, setTurn] = useState(0); //state for X or O's turn
  const [hasWon, setHasWon] = useState(false); //state that determines if game is won
  const [size, setSize] = useState(3);
  const [newGame, setNewGame] = useState(false);

  //side effect that triggers after list is rendered
  useEffect(() => {
    setHasWon(checkAll(list, playerTurn(turn))); //updates winning conditions
    setTurn((turn) => turn + 1); //updates turn order
  }, [list]);

  //when size is set changes list
  useEffect(() => {
    setList(setArrays("e", size));
    setTurn(0);
  }, [size]);

  useEffect(() => {
    setList(setArrays("e", size));
    setTurn(0);
    setHasWon(false);
    setNewGame(false);
  }, [newGame]);

  // use useState, as whenever you change the state it rerenders
  // searchup reach hooks 3 main ones: useeffect usestate useref
  const updateList = (i, j) => {
    //nabil
    // setList(list.map((row,m) =>
    //     row.map((item,n) =>
    //         m === i && n === j ?
    //         item === 0 ? 1 : 0
    //         : item //very useful
    // )));
    //igor
    //make new list
    if (list[i][j] === "e" && !hasWon) {
      //if game ending conditions have not been met
      let tempList = list; //create a temporary list from the current list
      tempList[i][j] = playerTurn(turn); //fill the index clicked with player turn's X or O
      setList([...tempList]); //update the list with the new list
      // setTurn(turn === "X" ? "O" : "X");
    }
  };

  ////////HOMEWORK
  //DONE/ fix savey package issue ---> issue had to do with react case sensitivity
  //DONE/ restrict each button so that once clicked, cannot be reclicked
  //DONE/ allow the ability for users to go from x and o
  //DONE/ check if a user has won
  //DONE/ any n x n dimension
  //DONE/ input box
  //DONE/                      - issue turns alternate as input rerenders list --> changed the IC of state to "O"
  //DONE/                      - placeholder text remains permanently
  //DONE/                      - nothing to reference input typed
  //DONE/                      - arrows on side of box do not work
  //DONE/ player role prompts
  //DONE/when game is done set no winner
  //DONE/ then try again?
  /// go back a turn ---> show turn moves
  //DONE/ new game button
  //DONE/ prettier

  return (
    <>
      <aside>TicTacToe</aside>
      <div className="temp">
        <div className="layout">
          <header>
            {hasWon ? (
              <div>
                Player {playerTurn(turn) === "X" ? "O" : "X"} has won!!!
              </div>
            ) : (turn === (size*size+ 1)) ? (
              <div>It's a draw.</div>
            ) : (
              <div>Player {playerTurn(turn)}'s turn.</div>
            )}
          </header>
          <main>
            {list.map((row, i) => (
              <div key={i}>
                {row.map((item, j) => (
                  <button
                    className={item === "e" ? "hide-text" : ""}
                    onClick={() => updateList(i, j)}
                    key={j}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </main>
          <footer>
            <span>Box sizing: </span>
            <input
              type="text"
              maxLength="2"
              size="2"
              value={size}
              // name = {(e) => e.target.value}
              onChange={(e) => setSize(e.target.value)}
            />
          </footer>
          { hasWon ?
              <div className="try-again">Try Again?</div>
            : (turn === (size*size + 1)) &&
              <div className="try-again">Play Again?</div>
            } 
          <button className="new-game" onClick={() => setNewGame(true)}>
            New Game
          </button>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
