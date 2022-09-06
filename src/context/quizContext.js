import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  film: 11,
  television: 14,
  videogames: 15,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = ``;

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=14&difficulty=easy";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Waiting user input
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  // Fetch all the questions
  const [questions, setQuestions] = useState([]);
  // Index number of the question
  const [index, setIndex] = useState(0);
  // Correct answers
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  // User selections. Controlled inputs as object
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "television",
    difficulty: "easy",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));

    if (response) {
      const data = response.data.results;
      // If we get the questions it means data array is 1+
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      // If it's end of the array return to first question
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    // If the value is true, add one to correct answers
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    // Regardless, go to next question
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    // The values has to match with html element's "name".
    const name = e.target.name;
    const value = e.target.value;
    // Dynamically change the values (i.e difficulty: easy)
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    // table object above holds the numeric value for API. If the user select "film" we get "11" from the table
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;

    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
