import React from "react";

export default function Meaning({ meaning, onSynonymClick }) {
  if (!meaning || !Array.isArray(meaning.definitions) || meaning.definitions.length === 0) {
    return null;
  }

  const firstDefinition = meaning.definitions[0];
  const synonyms = firstDefinition.synonyms || [];

  return (
    <div className="mb-4">
      <p className="italic text-gray-600">{meaning.partOfSpeech}</p>
      <p className="text-sm text-gray-800">{firstDefinition.definition}</p>

      {firstDefinition.example && (
        <p className="text-xs text-gray-500 mt-1">e.g. {firstDefinition.example}</p>
      )}

      {synonyms.length > 0 && (
        <div className="text-sm text-purple-700 mt-2">
          <strong>Synonyms:</strong>{" "}
          {synonyms.slice(0, 5).map((syn, idx) => (
            <button
              key={idx}
              onClick={() => onSynonymClick(syn)}
              className="underline hover:text-purple-900 mr-2"
            >
              {syn}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
