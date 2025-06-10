import React, { useState, useRef } from "react";
import Meaning from "./Meaning";
import { FaPlay, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function Result({ result, onSynonymClick }) {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);
  const audioRef = useRef(null); 

  const playAudio = (url, index) => {
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    
    setErrorIndex(null);
    setLoadingIndex(index);
    setPlayingIndex(null);

    
    audio.oncanplaythrough = () => {
      setLoadingIndex(null);
      setPlayingIndex(index);
      audio.play();
    };

    
    audio.onended = () => {
      setPlayingIndex(null);
    };

  
    audio.onerror = () => {
      setLoadingIndex(null);
      setPlayingIndex(null);
      setErrorIndex(index);
    };
  };

  if (!result || !Array.isArray(result.meanings) || result.meanings.length === 0) {
    return <p className="mt-4 text-red-500">No meanings available.</p>;
  }

  const firstMeaning = result.meanings[0];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2 capitalize">{result.word}</h2>

      {result.phonetics && result.phonetics.length > 0 && (
        <div className="mb-4 space-y-2">
          {result.phonetics.map((phonetic, index) => (
            <div key={index} className="flex items-center space-x-3">
              {phonetic.text && (
                <span className="text-sm text-gray-600 italic">{phonetic.text}</span>
              )}

              {phonetic.audio && (
                <button
                  onClick={() => playAudio(phonetic.audio, index)}
                  className={`p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow
                    ${playingIndex === index ? "bg-green-500 animate-pulse" : ""}
                    ${loadingIndex === index ? "bg-yellow-500" : ""}
                    ${errorIndex === index ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"}
                    text-white
                  `}
                  title={
                    errorIndex === index
                      ? "Audio failed to load"
                      : playingIndex === index
                      ? "Playing..."
                      : "Play pronunciation"
                  }
                >
                  {loadingIndex === index ? (
                    <FaSpinner className="animate-spin" />
                  ) : errorIndex === index ? (
                    <FaExclamationTriangle />
                  ) : (
                    <FaPlay />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Meaning meaning={firstMeaning} onSynonymClick={onSynonymClick} />
    </div>
  );
}
