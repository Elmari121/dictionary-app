import React from "react";
import Meaning from "./Meaning";

export default function Result({ result }) {
  if (!result || !Array.isArray(result.meanings) || result.meanings.length === 0) {
    return <p className="mt-4 text-red-500">No meanings available.</p>;
  }

  const firstMeaning = result.meanings[0];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2 capitalize">{result.word}</h2>
      {result.phonetics?.[0]?.text && (
        <p className="text-sm text-gray-500 mb-2">/{result.phonetics[0].text}/</p>
      )}
      <Meaning meaning={firstMeaning} />
    </div>
  );
}

