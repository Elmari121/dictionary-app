import React, { useState } from "react";
import axios from "axios";
import "./dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleResponse(response) {
    if (response.data && response.data.word) {
      setResult(response.data);
      setError(null);
    } else {
      handleError();
    }
  }

  function handleError() {
    setResult(null);
    setError("No definition found. Try another word.");
  }

  function search(event) {
    event.preventDefault();
    if (!keyword.trim()) return;

    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=30927dtfa44b4770359oe8258a9c5b2c`;
    axios.get(apiUrl).then(handleResponse).catch(handleError);
  }

  function handleKeyWordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="dictionary">
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="Enter a word..."
          onChange={handleKeyWordChange}
          value={keyword}
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h2>{result.word}</h2>

          {result.phonetics?.[0]?.text && (
            <p>
              <em>{result.phonetics[0].text}</em>
            </p>
          )}

          {result.phonetics?.[0]?.audio && (
            <audio controls src={result.phonetics[0].audio}>
              Your browser does not support the audio element.
            </audio>
          )}

          {result.meanings?.map((meaning, index) => (
            <div key={index} className="meaning">
              <strong>{meaning.partOfSpeech}</strong>
              <ul>
                {meaning.definitions?.map((def, i) => (
                  <li key={i}>{def.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
