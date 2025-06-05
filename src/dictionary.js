import React, { useState } from "react";
import "./dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("sun");
  const [result, setResult] = useState(null);

  function search(event) {
    event.preventDefault();
  
    setResult(`You searched for: ${keyword}`);
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
      {result && (
        <div className="result">
          {result}
        </div>
      )}
    </div>
  );
}
