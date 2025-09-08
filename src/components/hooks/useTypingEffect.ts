import React, { useState, useEffect } from 'react';

export const useTypingEffect = (fullText: string, speed: number = 100) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isTyping, fullText, speed]);

  return { typedText, isTyping, setIsTyping };
};
