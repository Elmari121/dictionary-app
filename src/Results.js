import React, { useState, useRef } from "react";
import Meaning from "./Meaning";
import { FaPlay, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import "./Results.css";

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
    return <p className="no-meaning-message">No meanings available.</p>;
  }

  const firstMeaning = result.meanings[0];

  return (
    <div className="result-container">
      <h2 className="result-word">{result.word}</h2>

      {result.phonetics && result.phonetics.length > 0 && (
        <div className="phonetic-group">
          {result.phonetics.map((phonetic, index) => (
            <div key={index} className="phonetic-item">
              {phonetic.text && (
                <span className="phonetic-text">{phonetic.text}</span>
              )}

              {phonetic.audio && (
                <button
                  onClick={() => playAudio(phonetic.audio, index)}
                  className={`audio-button
                    ${playingIndex === index ? "playing" : ""}
                    ${loadingIndex === index ? "loading" : ""}
                    ${errorIndex === index ? "error" : ""}
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
                    <FaSpinner className="icon-spin" />
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
