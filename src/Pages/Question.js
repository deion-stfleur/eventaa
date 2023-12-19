import React, { useState } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

const Questionnaire = ({ username }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const location=useLocation()

  const handleSubmit = async () => {
    try {
      // Assuming your backend has an endpoint to handle questionnaire submissions
      const response = await axios.post('http://localhost:3000/submit-questionnaire', {
        username,
        answers,
      });

      if (response.data.success) {
        console.log('Questionnaire submitted successfully');
        // Handle success, e.g., show a success message or redirect
      } else {
        console.log('Error submitting questionnaire');
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error during questionnaire submission:', error);
      // Handle error, e.g., show an error message
    }
  };

  // Fetch questions from the server, possibly in a useEffect

  return (
    <div>
      <h2>Questionnaire</h2>
      {/* Render questions here, allowing users to provide answers */}
      {/* Example: */}
      <div>
        <p style="color: #000">Question 1: What is your favorite color?</p>

        <h1>Hello {location.state.id} and welcome to the home</h1>
        <input
          type="text"
          value={answers.question1 || ''}
          onChange={(e) => handleAnswer('question1', e.target.value)}
        />
      </div>
      {/* Add more questions as needed */}
      <button onClick={handleSubmit}>Submit Questionnaire</button>
    </div>
  );
};

export default Questionnaire;
