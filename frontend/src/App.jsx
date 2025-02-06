// Frontend (React)
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch("http://a1f75d954086d4c0f8d513f22340dc4a-1181113313.us-east-2.elb.amazonaws.com/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
  
  const fetchData = () => {
    fetch('http://a1f75d954086d4c0f8d513f22340dc4a-1181113313.us-east-2.elb.amazonaws.com/data')
      .then((res) => res.json())
      .then((data) => setDataList(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input: Check if the trimmed input is empty
    if (!input.trim()) {
      alert("Please enter something before submitting.");
      return;
    }

    fetch('http://a1f75d954086d4c0f8d513f22340dc4a-1181113313.us-east-2.elb.amazonaws.com/data', {
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