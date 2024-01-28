
import { useEffect, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter)

export default function App() {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const makeAPICall = () => {
  fetch(`https://api.api-ninjas.com/v1/quotes?category=cool`, {
    headers: {
      'X-API-Key': 'HX2m4CWBKfczOuI8nz6ZYg==Q5f6xJzq9RfUmPzc'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
      setData(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
 }

  useEffect(() => {
    makeAPICall();
  }, []);

  function newQuote() {
    makeAPICall();
  }

  return (
    <div className="App" id="quote-box" style={{ textAlign: "center"}}>
      <h1>Random Quote Generator</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <>
        {data &&
          data.map(({ quote, author }) => (
            <>
              <h2 id="text" key={0}>{quote}</h2>
              <p id="author" key={1}>{author}</p>
            </>
          ))}
      </>
      <button id="new-quote" onClick={() => newQuote()}>Get New Quote</button>
      <br></br>
      <a id="tweet-quote" href="http://twitter.com/intent/tweet" target="_blank" rel="noreferrer" alt="tweet_icon">
        <FontAwesomeIcon icon="fa-brands fa-twitter" />
      </a>
      </div>
  );
}