import React, {useState} from "react";
import Gameboard from "./Gameboard";
import GameOver from "./Gameover";
import StartScreen from "./StartScreen";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState("");

  function restartGame() {
    setGameFinished(false);
    setCards(false);
    setWinner("");
    setGameStarted(false);
  }

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
    <header className="title">
      Concentration
    </header>
    {gameFinished && <GameOver winner={winner} gameFinished={gameFinished} startGame={restartGame}/>}
      {gameStarted === true ? (
        <Gameboard endGame={endGame} cards={cards}/>
      ) : (
        <StartScreen startGame={startGame} />
      )}
    </div>
  );
}

export default App;
