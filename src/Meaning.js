import React from "react";

export default function Meaning(props) {
  const { partOfSpeech, definitions } = props.meaning;

  if (!definitions || definitions.length === 0) {
    return null;
  }

  return (
    <div className="Meaning">
      <h3>{partOfSpeech}</h3>
      {definitions.map(function (definition, index) {
        return (
          <div key={index}>
            <p>
              {definition.definition}
              <br />
              <em>{definition.example ?? ""}</em>
            </p>
          </div>
        );
      })}
    </div>
  );
}
