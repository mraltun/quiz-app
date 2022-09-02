import React from "react";
import { useGlobalContext } from "./context/quizContext";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import SetupForm from "./components/SetupForm";

const App = () => {
  const { waiting, loading, questions, index, correct } = useGlobalContext();

  // Show the form if we are waiting for user input
  if (waiting) {
    return <SetupForm />;
  }

  // Show loading if we are still fetching the data
  if (loading) {
    return <Loading />;
  }

  return <main>quiz app</main>;
};

export default App;
