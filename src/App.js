import React, {useState} from "react";
import Gameboard from "./Gameboard";
import GameOver from "./Gameover";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState("");


  // Functions to generate the random place of cards at the start of the game.
  function addHearts(cardArray) {
    for (let i = 1; i < 14; i++) {
      cardArray.push({ number: i, suit: "heart", img: i + ".png", id: i });
    }
    console.log(cardArray);
  }

  function addJokers(cardArray) {
    cardArray.push({ number: 14, suit: "joker", img: "14.png", id: 14 });
    cardArray.push({ number: 14, suit: "joker", img: "15.png", id: 15 });
  }

  function addSpades(cardArray) {
    for (let i = 1; i < 14; i++) {
      cardArray.push({ number: i, suit: "spade", img: i + 15 + ".png", id: i+15 });
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startGame(){
  let cardArray = [];
  setWinner("");
  setGameFinished(false);
  addHearts(cardArray);
  addJokers(cardArray);
  addSpades(cardArray);
  shuffle(cardArray);
  setCards(cardArray);
  setGameStarted(true);
  }

  function determineWinner(p1, p2) {
    if (p1.length > p2.length) {
      setWinner("p1");
    } else if (p2.length > p1.length) {
      setWinner("p2");
    } else if (p1.length === p2.length) {
      setWinner("Draw");
    }
  }
  
  function endGame(p1Cards, p2Cards) {
    determineWinner(p1Cards, p2Cards);
    setGameFinished(true);
  }

  return (
    <div className="App">
    <div className="title">
      <h1>Matching Game</h1>
    </div>
    {gameFinished && <GameOver winner={winner} gameFinished={gameFinished} startGame={startGame}/>}
      {gameStarted === true ? (
        <Gameboard endGame={endGame} cards={cards}/>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
    </div>
  );
}

export default App;
