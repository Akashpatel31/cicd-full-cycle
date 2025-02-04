import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://backend-docker-qou7.onrender.com/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
