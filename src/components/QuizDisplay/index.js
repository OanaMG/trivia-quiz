import React, {useState, useEffect} from "react";
import Button from "../Button";
import './QuizDisplay.css';

    function QuizDisplay () {
        const [quizInfo, setQuizInfo] = useState([]);
        const [counter, setCounter] = useState(0);
        const [wrongCounter, setWrongCounter] = useState(0); //wrong answers, not visible on page
        const [quizLevel, setQuizLevel] = useState(process.env.REACT_APP_TRIVIA_EASY_API_URL);
        
        useEffect(() => {
            async function getQuiz (){
                let response = await fetch (`${quizLevel}`);
                let data = await response.json();
                //console.log(data.results);
                const consolidatedResults = data.results.map((item)=>{
                    return {               
                        answers: shuffle([...item.incorrect_answers.map((answer)=>{
                            return {text: replaceChar(answer), isCorrect: false}
                        }), {text: replaceChar(item.correct_answer), isCorrect: true}]),
                        question: replaceChar(item.question)
                    }
                })
                console.log(consolidatedResults);
                setQuizInfo(consolidatedResults)
            
            }
            getQuiz();
            console.log(quizInfo);
        }, [quizLevel]);


    function handleQuizLevel() {
        if(counter+wrongCounter !== 10){
            alert("You need to answer all the questions");
        } else {
            if(counter >= 7){
                alert("Congratulations! You've made it to the next level");
                setQuizLevel(process.env.REACT_APP_TRIVIA_MOVIES_EASY_API_URL);
                //window.location.reload();

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
        alert(`Wrong Answer`); //maybe add what the correct answer is
    }

    function replaceChar(string){
        return string
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");   
    }

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
    
    return (
    <div id="game-viewer">
        <h1 id="pointsHeader">Points: {counter}</h1>   
        {quizInfo.map((item, index) => 
            (<div key={index}> 
                <h2>{item.question}</h2>
                <Button answersArray={item.answers} handleCorrectClick={handleCorrectAnswer} handleIncorrectClick={handleIncorrectAnswer}></Button>
            </div>)
        )}
        <button className="next-level-button" onClick={handleQuizLevel}>Next Level</button>
    </div>
    );
}

export default QuizDisplay;