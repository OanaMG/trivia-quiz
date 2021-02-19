import React, {useState} from "react";
import '../App/App.css';

function Button ({arrayIncorrect, itemCorrect, handleCorrectClick, handleIncorrectClick}){
    const [isDisabled, setDisabled] = useState(false);
    return(
    <div>
        <button disabled={isDisabled} className="correctButton" onClick={ () => {
                setDisabled(true);
                handleCorrectClick();
            }}>{itemCorrect}</button>
        {arrayIncorrect.map ((item, index) => 
        (
            <div key={index}>
            <button disabled={isDisabled} className="incorrectButton" onClick={ () => {
                setDisabled(true);
                handleIncorrectClick();
            }}>{item}</button>
        </div>)
        )}
    </div>
    )    
}
export default Button;