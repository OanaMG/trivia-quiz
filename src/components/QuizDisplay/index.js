import React, {useState, useEffect} from "react";
import { ChakraProvider, Stack, Heading, Flex, Button } from "@chakra-ui/react";
import QuestionButtons from "../QuestionButtons";

    function QuizDisplay ({category, showQuiz}) {
        const [quizInfo, setQuizInfo] = useState([]);
        const [counter, setCounter] = useState(0);
        const [questionCounter, setQuestionCounter] = useState(0);
        const [correctAnswersCompletedLevel, setCorrectAnswersCompletedLevel] = useState(0);

        useEffect(() => {
            getQuiz(process.env[`REACT_APP_TRIVIA_${category}_EASY_API_URL`]);   
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]); 


        async function getQuiz (api){
            let response = await fetch (api);
            let data = await response.json();
            //console.log(data.results);
            const consolidatedResults = data.results.map((item)=>{
                return {               
                    answers: shuffle([...item.incorrect_answers.map((answer)=>{
                        return {text: replaceChar(answer), isCorrect: false}
                    }), {text: replaceChar(item.correct_answer), isCorrect: true}]),
                    question: replaceChar(item.question),
                    disabled: false,
                }
            })
            //console.log(consolidatedResults);
            setQuizInfo(consolidatedResults)
        }

    function manageLevelTransition (levelPointsThreshold, currentLevelApi, newLevelApi){
        if (counter >= levelPointsThreshold && levelPointsThreshold !== 23) {
            setCorrectAnswersCompletedLevel(counter);
            alert("Congratulations! You've made it to the next level");
            getQuiz(newLevelApi);
        } else if ((counter >= levelPointsThreshold && levelPointsThreshold === 23)) {
            alert(`Congratulations! You've won the game! You've made a total of ${counter} points out of 30 possible!`);
            getQuiz(newLevelApi);
            setCounter(0);
            setQuestionCounter(0);
        } else {
            alert(`You only got ${counter} points, but you need at least ${levelPointsThreshold} to pass to the next level`);
            getQuiz(currentLevelApi);
            setQuestionCounter(questionCounter-10);
            setCounter(correctAnswersCompletedLevel);
        }
    }

    function handleQuizLevels() {
        if((questionCounter <10) || (questionCounter >10 && questionCounter <20))
        {
            alert("You need to answer all the questions");
        } else if (questionCounter === 10) {
            manageLevelTransition(7, process.env[`REACT_APP_TRIVIA_${category}_EASY_API_URL`], process.env[`REACT_APP_TRIVIA_${category}_MEDIUM_API_URL`]);

        } else if (questionCounter === 20){ 
            manageLevelTransition(15, process.env[`REACT_APP_TRIVIA_${category}_MEDIUM_API_URL`], process.env[`REACT_APP_TRIVIA_${category}_HARD_API_URL`]);
        } else if (questionCounter === 30){
            manageLevelTransition(23, process.env[`REACT_APP_TRIVIA_${category}_HARD_API_URL`], process.env[`REACT_APP_TRIVIA_${category}_EASY_API_URL`]);
        }     
    }
    
    function changeDisabledStatus(question){        
        var array = quizInfo.map((item) => {
            if (item.question === question){         
                item.disabled = !item.disabled;
                return item;
            }
            return item;
        })
        setQuizInfo(array);
    }

    function handleCorrectAnswer(question){
        setCounter(counter+1);  
        setQuestionCounter(questionCounter+1);
        changeDisabledStatus(question);
    }

    function handleIncorrectAnswer(question){
        //setWrongCounter(wrongCounter+1);
        setQuestionCounter(questionCounter+1);

        changeDisabledStatus(question);
        //alert(`Wrong Answer`); //maybe add what the correct answer is
    }

    function replaceChar(string){
        return string
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&euml;/g, "e")
        .replace(/&eacute;/g, "e")
        .replace(/&rsquo;/g, "'");   
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
    <ChakraProvider>
        <Stack w="70%" align="center" ml="15%" border="solid" bg="pink" borderRadius="3%">
        {showQuiz ? (<Heading>Points: {counter}</Heading> ) : null}
        <Heading>Points: {counter}</Heading>   
        {quizInfo.map((item, index) => {
            return (<div key={index}> 
                    <Heading size="lg" align="center" mb="1%" mt="2%">{item.question}</Heading>
                    <Flex direction="column" align="center">
                        <QuestionButtons question={item.question} disabledStatus={item.disabled} answersArray={item.answers} handleCorrectClick={handleCorrectAnswer} handleIncorrectClick={handleIncorrectAnswer}></QuestionButtons>
                    </Flex>

            </div>)}
        )}
        <Button mb="2%" mt="1%" onClick={handleQuizLevels}>Next Level</Button>
        </Stack>
        </ChakraProvider>
    </div>
    );

}

export default QuizDisplay;