import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loadTests, getTest, postAnswer } from '../../actions/tests.js';
import { setAlert } from '../../actions/alert.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';

const MarkTest = () => {
  const dispatch = useDispatch();

  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [testName, setTestName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Initialize with an empty array

  const tests = useSelector((state) => state.tests.tests);

  const selectedQuestions = useSelector((state) => state.selectedQuestions);

  console.log('selectedQuestions:: ', selectedQuestions);

  console.log('tests.test_name:: ', tests.tests);

  const isAdmin = localStorage.getItem('isAdmin');

  // Initialize userAnswers inside a useEffect that depends on tests
  useEffect(() => {
    if (Array.isArray(tests)) {
      setUserAnswers(Array(tests.length).fill(''));
    }
  }, [tests]);

  useEffect(() => {
    console.log(' in useEffect dispatch(loadTests());');
    dispatch(loadTests());
  }, [dispatch]);

  const handleInputChange = (e) => {
    console.log('in handleInputChange: ', e.target.value);

    e.preventDefault();
    setTestName(e.target.value);

    console.log('testName: ', testName);

    dispatch(getTest(e.target.value));
    if (tests.length === 0) {
      dispatch(loadTests());
    }
    //
    //setIsDisabled(true);
  };

  // Event handler to handle option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAnswer = (userAnswers, questionId, testName) => {
    console.log('in handleAnswer: ', userAnswers, questionId, testName);
    dispatch(postAnswer(questionId, userAnswers, testName));
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <ul>
          <li
            style={{
              color: 'black',
              backgroundColor: 'white',
              fontWeight: 'bold',
            }}
          >
            <div className="form-group">
              {/*<label htmlFor="optionTest">Select a test:</label>*/}
              Select a test:
              <select
                name="testName"
                value={testName}
                onChange={handleInputChange}
                //disabled={isDisabled}
                className="select-element"
              >
                <option key="default" value=""></option>
                {tests.map((test) => (
                  <option key={test._id} value={test.test_name}>
                    {test.test_name}
                  </option>
                ))}
              </select>
            </div>
          </li>

          <li
            style={{
              color: 'black',
              backgroundColor: 'white',
              fontWeight: 'bold',
            }}
          >
            {Array.isArray(tests) ? (
              tests.map((question, index) => (
                <div key={question._id}>
                  <p>
                    Question {index + 1}: {question.question}
                  </p>

                  {isAdmin === 'true' && (
                    <div style={{ color: 'black', backgroundColor: 'white' }}>
                      <p style={{ color: 'red', backgroundColor: 'white' }}>
                        Answer: {question.answer}
                      </p>

                      <div>
                        Topic: {question.topic} <br />
                        Difficulty Level: {question.difficulty_level}
                        <br />
                        Question Id: {question.questionId}
                        <br />
                        Test Name: {question.test_name}
                      </div>

                      <div>
                        <label htmlFor="optionSelect">Select an option:</label>
                        <select
                          id="optionSelect"
                          value={userAnswers[index] || ''}
                          onChange={(e) => {
                            const updatedAnswers = [...userAnswers]; // Create a copy of the state array
                            updatedAnswers[index] = e.target.value; // Update the corresponding value
                            setUserAnswers(updatedAnswers); // Set the new state
                          }}
                          className="select-element"
                        >
                          <option value="">Select an option</option>
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() =>
                            handleAnswer(
                              userAnswers[index],
                              question.questionId,
                              question.test_name
                            )
                          }
                        >
                          Post Answer
                        </button>
                      </div>
                      <br />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No questions to display</p>
            )}
          </li>
        </ul>
        {/*{tests}*/}
      </div>
    </div>
  );
};

export default MarkTest;