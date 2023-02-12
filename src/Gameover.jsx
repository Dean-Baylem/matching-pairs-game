import "./gameover.css";


function GameOver(props) {
    // Will pass through gameFinished in props.

    return (
        <div style={{
            visibility: props.gameFinished ? "visible" : "hidden",
            opacity: props.gameFinished ? "1" : "0"
            }}
            className="overlay"
            >
        <div className="popup">
            {props.winner === "Draw" ? <h2>Draw!</h2> : <h2>{props.winner} is the winner!</h2>}
            <span className="close"></span>
            <div className="content">Press the button to reset the game!<button onClick={props.startGame}>Restart</button></div>
        </div>
        </div>
    );
}

export default GameOver;