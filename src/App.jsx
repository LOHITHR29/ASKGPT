import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCYKG684Z9SeH2ksRjNCsjHDzD3sSfhbn4",
        { contents: [{ parts: [{ text: question }] }] }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAnswer('Error fetching answer');
    }
  }

  return (
    <div className="container">
      <h1 className="animate-header">ASKGPT</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        cols="30"
        rows="10"
      />
      <button onClick={generateAnswer}>Generate Answer</button>
      <div className="answer-container">
        <h1 className="animate-header">ASKGPT</h1>
        <div className="answer-content">
          <pre>{answer}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
