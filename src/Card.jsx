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
        <div onClick={handleClick} onMouseEnter={hightlightCard} onMouseLeave={removeHighlight} className={styling}>
            { props.cardRevealed === true 
            ? 
            <div>
                <h1>{props.cardNum}</h1>
                <h3>{props.cardSuit}</h3>
                <h5>{props.cardImg}</h5>
                <h5>{props.id}</h5>
            </div>
            : 
            <div>
                <img src="images/back.png" alt="Cardback"/>
            </div>    
            }
        </div>
    )
}

export default Card;