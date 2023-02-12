import React, {useState} from "react";

function Card(props) {

    const [highlight, setHighlight] = useState("non-highlight");

    const styling = highlight + " " + (props.found === true ? "non-visible" : "visible")

    function hightlightCard(){
        setHighlight("highlight");
    }

    function removeHighlight(){
        setHighlight("non-highlight");
    }

    function handleClick() {
        props.storeCards(props.cardNum, props.id);
    }

    return (
      <div
        onClick={handleClick}
        onMouseEnter={hightlightCard}
        onMouseLeave={removeHighlight}
        className={styling}
      >
        {props.cardRevealed === true ? (
          <div>
            <img
              className="board-card"
              src={"images/" + props.cardImg}
              alt="card-face"
            />
          </div>
        ) : (
          <div>
            <img 
                className="board-card" 
                src="images/back.png" 
                alt="Cardback" 
            />
          </div>
        )}
      </div>
    );
}

export default Card;