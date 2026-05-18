import React, { useState, useEffect } from 'react';

const TextType = ({
  text,
  texts,
  typingSpeed = 65,
  deletingSpeed = 100,
  pauseDuration = 1300,
  showCursor = true,
  cursorCharacter = "_",
}) => {
  // Handle both `text` and `texts` props since the snippet had both
  const stringArray = Array.isArray(texts) && texts.length > 0 ? texts : Array.isArray(text) ? text : typeof text === 'string' ? [text] : ["Typing..."];

  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = stringArray[textIndex];
    let timeoutId;

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % stringArray.length);
        timeoutId = setTimeout(() => {}, 200);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === fullText) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, textIndex, stringArray, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className="inline-flex items-center text-xl font-semibold">
      <span>{currentText}</span>
      {showCursor && (
        <span className="animate-blink ml-1 text-gray-400">{cursorCharacter}</span>
      )}
    </div>
  );
};

export default TextType;
