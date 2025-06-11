import React, { useState } from "react";
import axios from "axios";
import Result from "./Results";
import "./dictionary.css";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const searchWord = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      setResult(response.data[0]);
      setWord(searchTerm);
      setError("");
    } catch (err) {
      setResult(null);
      setError("Word not found. Please try another.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchWord(word);
  };

  return (
    <div className="dictionary-container">
      <div className="dictionary-box">
        <h1 className="dictionary-title">📘 My Dictionary</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a word"
          className="dictionary-input"
        />
        <button onClick={() => searchWord(word)} className="dictionary-button">
          Search
        </button>
        {error && <p className="error-message">{error}</p>}
        {result && <Result result={result} onSynonymClick={searchWord} />}
      </div>
    </div>
  );
}
