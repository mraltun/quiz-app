import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  film: 11,
  television: 14,
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const tempUrl = "https://opentdb.com/api.php?amount=10&category=14";

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

  // Just for the testing purposes. Refactor later.
  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

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
