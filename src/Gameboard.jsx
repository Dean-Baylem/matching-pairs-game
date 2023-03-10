import React, {useState, useEffect} from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function Gameboard(props) {
  const [firstCard, setFirstCard] = useState("");
  const [FirstRevealed, setFirstRevealed] = useState("");
  const [secondRevealed, setSecondRevealed] = useState("");
  const [foundCards, setFoundCards] = useState([]);
  const [p1Cards, setp1Cards] = useState([]);
  const [p2Cards, setp2Cards] = useState([]);
  const [wait, setWait] = useState(false);
  const [activePlayer, setActivePlayer] = useState("p1");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to determine if the two chosen cards match then update the card arrays.
  function determineMatch(cardNum) {
    if (firstCard === cardNum) {
      // **** Set it so that before the wait a message appears on screen highlighting the correct choice ****
      // **** Then after the wait, reset the state so the message dissapears.
      console.log("Match!");
      setFoundCards((prevValue) => {
        return [...prevValue, cardNum];
      });
      if (activePlayer === "p1") {
        setp1Cards((prevValue) => {
          return [...prevValue, cardNum];
        });
      } else if (activePlayer === "p2") {
        setp2Cards((prevValue) => {
          return [...prevValue, cardNum];
        });
      }
    } else {
      console.log("No match!");
      if (activePlayer === "p1") {
        setActivePlayer("p2");
      } else {
        setActivePlayer("p1");
      }
    }
  }

  // Function to reset the card clicked and revealed states after the match has been determined.
  function resetStates() {
    setWait(false);
    setFirstCard("");
    setFirstRevealed("");
    setSecondRevealed("");
  }

  function handleClick(cardNum, id) {
    // Check if first or second card clicked
    // If first, set the FirstCard state to the num for later checking
    // Set the FirstRevealed to the id of the first card to display to users.
    if (firstCard === "") {
      setFirstCard(cardNum);
      setFirstRevealed(id);
    } else {
      setWait(true);
      // If second - set SecondRevealed to card id to display to users with delay.
      setSecondRevealed(id);
      sleep(2000).then(() => {
        determineMatch(cardNum);
        resetStates();
      });
    }
  }


  // Function to determine if the game is over and then call the endGame function from the parent App.js file.

  useEffect(() => {
    if (foundCards.length === 14) {
      console.log("game over");
      props.endGame(p1Cards, p2Cards);
    }
  });

  return (
    <div className="gameboard">
      <div className="player-board-left">
        <div>
          <h1>Player 1 Board</h1>
          <FontAwesomeIcon
            icon={faGamepad}
            style={
              activePlayer === "p2"
                ? { visibility: "hidden" }
                : { fontSize: "2rem" }
            }
          />
        </div>
        <div className="took-card-group">
          {p1Cards.map((card) => (
            <img
              className="took-card"
              src={"images/" + card + ".png"}
              alt="card"
            />
          ))}
        </div>
      </div>
      <div className="card-board">
        {props.cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            found={foundCards.includes(card.number) ? true : false}
            storeCards={wait !== true ? handleClick : null}
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
      <div className="player-board-right">
        <div>
          <h1>Player 2 Board</h1>
          <FontAwesomeIcon
            icon={faGamepad}
            style={
              activePlayer === "p1"
                ? { visibility: "hidden" }
                : { fontSize: "2rem" }
            }
          />
        </div>
        <div>
          {p2Cards.map((card) => (
            <img
              className="took-card"
              src={"images/" + card + ".png"}
              alt="card"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gameboard;

