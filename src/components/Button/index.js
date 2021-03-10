import React, {useState} from "react";
import '../App/App.css';

function Button ({question, answersArray, handleCorrectClick, handleIncorrectClick, disabledStatus}){
    //console.log("second"+disabledStatus);
   // console.log("Button question " + question);
    return(
    <div>
        {answersArray.map ((item, index) =>
            (<div key={index}>
                <button disabled={disabledStatus} className="answer-button" onClick={ () => {
                    //setDisabled(true);
                    if(item.isCorrect){
                        handleCorrectClick(question); //pass in the index
                    } else {
                        handleIncorrectClick(question);
                    }
                }}>{item.text}</button>
            </div>)
        )}
    </div>
    )    
}
export default Button;