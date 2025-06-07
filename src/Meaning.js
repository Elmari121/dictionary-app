import React from "react";

export default function Meaning({ meaning }) {
  if (!meaning || !Array.isArray(meaning.definitions) || meaning.definitions.length === 0) {
    return null;
  }

  const firstDefinition = meaning.definitions[0];

  return (
    <div className="mb-4">
      <p className="italic text-gray-600">{meaning.partOfSpeech}</p>
      <p className="text-sm text-gray-800">{firstDefinition.definition}</p>
      {firstDefinition.example && (
        <p className="text-xs text-gray-500 mt-1">e.g. {firstDefinition.example}</p>
      )}
    </div>
  );
}

