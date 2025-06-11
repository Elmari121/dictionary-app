import React from "react";
import "./meaning.css";

export default function Meaning({ meaning, onSynonymClick }) {
  if (!meaning || !Array.isArray(meaning.definitions) || meaning.definitions.length === 0) {
    return null;
  }

  const firstDefinition = meaning.definitions[0];
  const synonyms = firstDefinition.synonyms || [];

  return (
    <div className="meaning-container">
      <p className="part-of-speech">{meaning.partOfSpeech}</p>
      <p className="definition-text">{firstDefinition.definition}</p>

      {firstDefinition.example && (
        <p className="example-text">e.g. {firstDefinition.example}</p>
      )}

      {synonyms.length > 0 && (
        <div className="synonyms">
          <strong>Synonyms:</strong>{" "}
          {synonyms.slice(0, 5).map((syn, idx) => (
            <button
              key={idx}
              onClick={() => onSynonymClick(syn)}
              className="synonym-button"
            >
              {syn}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
