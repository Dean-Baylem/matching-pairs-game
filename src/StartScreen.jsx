import React from "react";

function StartScreen(props) {

    return (
      <div className="start-screen">
        <div>
          <img
            className="start-animation"
            src="images/animation.gif"
            alt="animation"
          />
        </div>
        <div>
          <h2 className="subtitle">Game Rules</h2>
          <p>
            (1) Turn player sleects two cards. If the numbers match then the
            turn player may take another turn.
          </p>
          <p>
            (2) When all cards have been taken, the winner is whomever has the
            most pairs of cards.
          </p>
        </div>
        <button className="button-33" onClick={props.startGame}>
          Start!
        </button>
      </div>
    );
}

export default StartScreen;