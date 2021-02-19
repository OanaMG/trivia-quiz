import React, {useState, useEffect} from "react";
import '../App/App.css';

function Button ({arrayIncorrect, itemCorrect, handleCorrectClick, handleIncorrectClick, cleanText}){
    const [isDisabled, setDisabled] = useState(false);
    let answersArray =  [...arrayIncorrect, itemCorrect];

    function shuffle(arr) {
        let i,j,temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
        }
        return arr;    
    };

    useEffect(() => {
        shuffle(answersArray);
        console.log(itemCorrect);
    }, [])

    return(
    <div>
        {answersArray.map ((item, index) => 
        (<div key={index}>
            <button disabled={isDisabled} className="answer-button" onClick={ () => {
                setDisabled(true);
                let correctAnswer = itemCorrect;
               
                if (item === correctAnswer){
                    handleCorrectClick();
                } else {
                    handleIncorrectClick();
                }
            }}>{cleanText(item)}</button>
        </div>)
         )}
       
    </div>
    )    
}
export default Button;