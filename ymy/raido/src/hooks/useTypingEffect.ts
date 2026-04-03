import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed = 50, startDelay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let index = 0;

    const typeCharacter = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeCharacter, speed);
      } else {
        setIsComplete(true);
      }
    };

    if (startDelay > 0) {
      timeoutId = setTimeout(typeCharacter, startDelay);
    } else {
      timeoutId = setTimeout(typeCharacter, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};
