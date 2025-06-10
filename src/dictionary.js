import React, { useState } from "react";
import axios from "axios";
import Result from "./Results";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          📘 My Dictionary
        </h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a word"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 mb-4"
        />
        <button
          onClick={() => searchWord(word)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-150"
        >
          Search
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {result && <Result result={result} onSynonymClick={searchWord} />}
      </div>
    </div>
  );
}
