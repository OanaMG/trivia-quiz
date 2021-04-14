import QuizDisplay from '../QuizDisplay';
import './App.css';
import { ChakraProvider, Heading, Box } from "@chakra-ui/react"
import RadioCategories from "../RadioCategories";
import MainButton from "../MainButton";

import React, {useState} from "react";

function App() {

  const [showQuiz, setShowQuiz]  = useState(false);
  const [value, setValue] = useState("books");
  const [quizCategory, setQuizCategory] = useState("BOOKS");

  
  function displayQuiz(){
    if (value === "books"){
      setQuizCategory("BOOKS");
      setShowQuiz(true)
    } else if (value === "movies") {
      setQuizCategory("MOVIES")
      setShowQuiz(true)
    } else if (value === "videoGames"){
      setQuizCategory("VIDEOGAMES")
      setShowQuiz(true)
    }
  }

  function stopDisplayQuiz(){
    setShowQuiz(false)
  }

  console.log("Value " + value);

  return (
    <div className="App">
      {/* <GetPokemonAvatar /> */}
      <ChakraProvider>
          <Heading align="center" size="4xl" fontWeight="semibold">The Trivia Game</Heading>
          <Heading ml="5%" mb="0.5%">Select Quiz Category</Heading>
          <RadioCategories ml="25%" value={value} setValue={setValue} category1Text="Books" category2Text="Movies" category3Text="Video Games"/>
          <MainButton handleClick={displayQuiz} buttonText="Start Quiz"/>
          <MainButton handleClick={stopDisplayQuiz} buttonText="Stop Quiz"/>
      </ChakraProvider>
      { showQuiz ? <QuizDisplay category={quizCategory}/> : null}
      <ChakraProvider>
      {showQuiz ? null : <Box bg="pink" w="70%" h="980px" align="center" ml="15%" border="solid" borderRadius="3%">
        <Heading align="center" mt="30%">Select the quiz category you want and press START QUIZ to begin</Heading>
        </Box>}
      </ChakraProvider>


    </div>
  );
}

export default App;
