import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectQuestionsDifficultylevels } from '../../actions/question.js';

const MainTestDifficultyLevels = () => {
  const dispatch = useDispatch();

  const [showAnswer, setShowAnswer] = useState(false);
  let [questions, setQuestions] = useState([]);
  const isAdmin = localStorage.getItem('isAdmin');

  const { checkedDifficultylevels, checkedSubjects, userId, noofquestions } =
    useParams();

  console.log(
    'MainTestTopics checkedDifficultylevels==',
    checkedDifficultylevels
  );

  const selectedQuestions = useSelector((state) => state.selectedQuestions);

  console.log('Array.isArray(questions):::', Array.isArray([questions]));
  console.log(
    'selectedQuestions.selectedQuestions)==',
    selectedQuestions.selectedQuestions
  );

  console.log('typeof questions ==', typeof questions);

  useEffect(() => {
    console.log('in useEffect');

    if (checkedDifficultylevels) {
      dispatch(
        selectQuestionsDifficultylevels(
          checkedDifficultylevels,
          checkedSubjects,
          userId,
          noofquestions
        )
      );
    }
  }, []);

  // Update selectedQuestions after API call
  useEffect(() => {
    console.log('in useEffect setQuestions(selectedQuestions);');
    if (selectedQuestions) {
      // Replace with actual variable name
      setQuestions(selectedQuestions.selectedQuestions);
      console.log('questions==', questions);
    }
  }, [selectedQuestions]);

  const handleClick = () => {
    setShowAnswer(true);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={handleClick}>
            See Answers
          </button>
        )}
        <ul>
          <li
            style={{
              color: 'black',
              backgroundColor: 'white',
              fontWeight: 'bold',
            }}
          >
            {questions.map((question, index) => (
              <div key={index}>
                <div>
                  Question:{index} <span> </span>
                  {question.question}
                </div>

                {showAnswer && (
                  <p style={{ color: 'red', backgroundColor: 'white' }}>
                    Answer: {question.answer}
                  </p>
                )}
                <br />
              </div>
            ))}
          </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MainTestDifficultyLevels;
