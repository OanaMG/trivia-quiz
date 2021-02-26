import React, {useState} from "react";
import '../App/App.css';

function Button ({answersArray, handleCorrectClick, handleIncorrectClick}){
    const [isDisabled, setDisabled] = useState(false);

    return(
    <div>
        {answersArray.map ((item, index) =>
            (<div key={index}>
                <button disabled={isDisabled} className="answer-button" onClick={ () => {
                    setDisabled(true);
                    if(item.isCorrect){
                        handleCorrectClick();
                    } else {
                        handleIncorrectClick();
                    }
                }}>{item.text}</button>
            </div>)
        )}
    </div>
    )    
}
export default Button;