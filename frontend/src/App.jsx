// App.jsx
import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import RunForm from './RunForm'; // Adjust path if needed

function App() {
  // Counter state
  const [count, setCount] = useState(0);

  // State for API response
  const [apiResponse, setApiResponse] = useState('');

  // Example: Fetch data from a backend endpoint on mount
// // useEffect(() => {
 /////   fetch('http://localhost:5000/api/hello')
  ////    .then((res) => res.json())
  ////    .then((data) => {
  ////      setApiResponse(data.message || 'No message received');
  ///    })
    ///  .catch((err) => {
   ///     console.error(err);
   ///     setApiResponse('Error fetching data');
 ///     });
  ////}, []);

  return (
    <div className="App">
      {/* Logos */}
      <div className="logos">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Title */}
      <h1>Vite + React</h1>

      {/* Counter */}
      <div className="card">
        <button onClick={() => setCount((prev) => prev + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* API response section */}
      <div className="api-response">
        <h2>Response from Backend:</h2>
        <p>{apiResponse}</p>
      </div>

      {/* RunForm component */}
      <RunForm />

      {/* Footer / Info */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
