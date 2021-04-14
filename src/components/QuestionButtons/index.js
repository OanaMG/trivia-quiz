import React, {useState, useEffect} from "react";
import { Button } from "@chakra-ui/react";

function QuestionButtons ({question, answersArray, handleCorrectClick, handleIncorrectClick, disabledStatus}){
   const [bgColor, setBgColor] = useState("teal")

   useEffect(() => {
    setBgColor("teal");
   }, [question])

    return(
    <div>
        {answersArray.map ((item, index) =>
            (<div key={index}>
                <Button mb="6px" colorScheme={bgColor} variant="outline" size="md" disabled={disabledStatus} className="answer-button" onClick={ ()=>{
                    if(item.isCorrect){
                        handleCorrectClick(question);
                    } else {
                        handleIncorrectClick(question);
                        setBgColor("red");

                    }
                }}>{item.text}</Button>
            </div>)
        )}
    </div>
    )    
}
export default QuestionButtons;