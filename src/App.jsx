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

  // Show loading if we are fetching the data
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // Add the correct one last for test purposes
  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          {/* The API is returns HTML, not string. */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></button>
              );
            })}
          </div>
        </article>
        <button className='next-question'>next question</button>
      </section>
    </main>
  );
};

export default App;
