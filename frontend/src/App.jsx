import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [jokes, setJokes] = useState([]); // Initialize with an empty array

  useEffect(() => {
    axios.get('/api/jokes')

      .then((response) => {
        setJokes(response.data);
      })

      .catch((error) => {
        console.log('Error fetching jokes:', error);
      });

  }, []); // Add an empty dependency array to run only on mount

  return (
    <>
      <h1>Chai aur Full Stack</h1>

      <p>Jokes: {jokes.length}</p>

      {jokes.length > 0 ? (

        jokes.map((joke) => (

          <div key={joke.id}>

            <h1>{joke.title}</h1>

            <p>{joke.content}</p>
            
          </div>
        ))
      ) : (
        <p>Loading jokes...</p> // Display this while jokes are being fetched
      )}
    </>
  );
}

export default App;
