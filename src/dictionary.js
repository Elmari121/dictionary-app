import React, { useState } from "react";
import axios from "axios";
import Result from "./Results";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const searchWord = async () => {
    if (!word.trim()) return;
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setResult(response.data[0]); 
      setError("");
    } catch (err) {
      setResult(null);
      setError("Word not found. Please try another.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchWord();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center mb-4">📘 Dictionary</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a word"
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={searchWord}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && <Result result={result} />}
    </div>
  );
}
