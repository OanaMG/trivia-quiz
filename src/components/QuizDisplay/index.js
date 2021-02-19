import React, {useState, useEffect} from "react";
import Button from "../Button";
import './QuizDisplay.css';

    function QuizDisplay () {
        const [quizInfo, setQuizInfo] = useState([]);
        const [counter, setCounter] = useState(0);
        const [wrongCounter, setWrongCounter] = useState(0);
        const [quizLevel, setQuizLevel] = useState(process.env.REACT_APP_TRIVIA_EASY_API_URL);

        useEffect(() => {
            async function getQuiz (){
                let response = await fetch (`${quizLevel}`);
                let data = await response.json();
                console.log(data.results[1]);
                setQuizInfo(data.results);
            }
            getQuiz();
        }, []);

    function handleQuizLevel() {
        if(counter+wrongCounter !== 10){
            alert("You need to answer all the questions");
        } else {
            if(counter >= 7){
                alert("Congratulations! You've made it to the next level");
                window.location.reload();
                //setLevel(2);
                setQuizLevel(process.env.REACT_APP_TRIVIA_MEDIUM_API_URL);
            }else{
                alert(`You only got ${counter} points, but you need at least 7 to pass to the next level`);
                window.location.reload();
            }
        }
    }

    function handleCorrectAnswer(){
        setCounter(counter+1);  
    }

    function handleIncorrectAnswer(){
        setWrongCounter(wrongCounter+1);
        //console.log (wrongCounter);
        alert("Wrong Answer");
    }

    function replaceChar(string){
        return string
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");   
    }
    
    return (
    <div id="game-viewer">
        <h1 id="pointsHeader">Points: {counter}</h1>   
        {quizInfo.map((item, index) => 
            (<div key={index}> 
                <h2>{replaceChar(item.question)}</h2>
                <Button arrayIncorrect={item.incorrect_answers} itemCorrect={item.correct_answer} handleCorrectClick={handleCorrectAnswer} handleIncorrectClick={handleIncorrectAnswer}></Button>
            </div>)
        )}
        <button className="next-level-button" onClick={handleQuizLevel}>Next Level</button>
    </div>
    );
}

export default QuizDisplay;