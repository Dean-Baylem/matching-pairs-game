import React, {useState} from "react";
import Card from "./Card";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState("");
  const [FirstRevealed, setFirstRevealed] = useState("");
  const [secondRevealed, setSecondRevealed] = useState("");
  const [foundCards, setFoundCards] = useState([]);

  // Functions to generate the random place of cards at the start of the game.
  function addHearts(cardArray) {
    for (let i = 1; i < 14; i++) {
      cardArray.push({ number: i, suit: "heart", img: i + ".jpg", id: i });
    }
    console.log(cardArray);
  }

  function addJokers(cardArray) {
    cardArray.push({ number: 14, suit: "joker", img: "14.jpg", id: 14 });
    cardArray.push({ number: 15, suit: "joker", img: "15.jpg", id: 15 });
  }

  function addSpades(cardArray) {
    for (let i = 1; i < 14; i++) {
      cardArray.push({ number: i, suit: "spade", img: i + 15 + ".jpg", id: i+15 });
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startGame(){
  let cardArray = [];
  addHearts(cardArray);
  addJokers(cardArray);
  addSpades(cardArray);
  shuffle(cardArray);
  setCards(cardArray);
  setGameStarted(true);
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Handles the player clicking on the card.
  function handleClick(cardNum, id) {
    // Check if first or second card clicked
    // If first, set the FirstCard state to the num for later checking
    // Set the FirstRevealed to the id of the first card to display to users.
   if (firstCard === "") {
    setFirstCard(cardNum)
    setFirstRevealed(id);
   } else {
    // If second - set SecondRevealed to card id to display to users with delay.
    setSecondRevealed(id);
    sleep(2000).then(() => {
      if (firstCard === cardNum) {
        // **** Set it so that before the wait a message appears on screen highlighting the correct choice ****
        // **** Then after the wait, reset the state so the message dissapears.
        console.log("Match!");
        setFoundCards((prevValue) => {
          return [...prevValue, cardNum];
        });
      } else {
        console.log("No match!");
      }
      setFirstCard("");
      setFirstRevealed("");
      setSecondRevealed("");
    });
   } 
  }


  return (
    <div className="App">
      {gameStarted === true ? (
        <div className="gameboard">
          {cards.map((card) => (
            <Card
              key = {card.id}
              id = {card.id}
              found={foundCards.includes(card.number) ? true : false}
              storeCards={handleClick}
              cardImg={card.img}
              cardNum={card.number}
              cardSuit={card.suit}
              cardRevealed={
                FirstRevealed === card.id
                  ? true
                  : secondRevealed === card.id
                  ? true
                  : false
              }
            />
          ))}
        </div>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
    </div>
  );
}

export default App;
