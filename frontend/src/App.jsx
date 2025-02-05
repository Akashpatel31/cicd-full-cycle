import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5004/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));

  // Fetch posts from the backend which integrates with JSONPlaceholder
  fetch("http://localhost:5004/posts")
  .then((res) => res.json())
  .then((data) => setPosts(data))
  .catch((err) => console.error("Error fetching posts:", err));

// Fetch a random user from the backend which integrates with Random User API
fetch("http://localhost:5004/random-user")
  .then((res) => res.json())
  .then((data) => setRandomUser(data.results[0]))
  .catch((err) => console.error("Error fetching random user:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>React Frontend Header</h1>
      <p>{message}</p>

      <section>
        <h2>Posts</h2>
        {posts.length ? (
          <ul>
            {posts.slice(0, 1).map((post) => (
              <li key={post.id} style={{ marginBottom: "10px" }}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading posts...</p>
        )}
      </section>

      <section>
        <h2>Random User</h2>
        {randomUser ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={randomUser.picture.thumbnail}
              alt="Random User"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <p>
                {randomUser.name.first} {randomUser.name.last}
              </p>
              <p>Email: {randomUser.email}</p>
            </div>
          </div>
        ) : (
          <p>Loading random user...</p>
        )}
      </section>
    </div>
  );
}

export default App;
