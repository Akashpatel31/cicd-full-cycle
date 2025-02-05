// Frontend (React)
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5004/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));

    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5004/data')
      .then((res) => res.json())
      .then((data) => setDataList(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5004/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDataList(data);
        setInput(''); // Clear input field after submission
      });
  };

  return (
    <div>
      <h1>React Frontend</h1>
      <p>{message}</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Submitted Data:</h2>
      <ul>
        {dataList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;