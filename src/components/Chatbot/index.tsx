import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatbotButton from './ChatbotButton';
import ChatbotWindow from './ChatbotWindow';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatbotButton isOpen={isOpen} onClick={toggleChatbot} />
      <AnimatePresence>
        {isOpen && <ChatbotWindow isOpen={isOpen} />}
      </AnimatePresence>
    </>
  );
}
