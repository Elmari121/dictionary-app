import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);

  function handleResponse(response) {
    console.log("API response:", response.data); 
setResults(response.data);

  }

  function search(event) {
    event.preventDefault();
    if (!keyword) {
      alert("Please enter a word");
      return;
    }

    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=30927dtfa44b4770359oe8258a9c5b2c`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="Enter a word..."
          onChange={handleKeywordChange}
        />
        <button type="submit" style={{ padding: 10, fontSize: 16 }}>
          Search
        </button>
      </form>
      <Results results={results} />
    </div>
  );
}
