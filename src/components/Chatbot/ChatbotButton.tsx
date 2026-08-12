import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export default function ChatbotButton({ isOpen, onClick, unreadCount = 0 }: ChatbotButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-16 h-16 md:w-16 md:h-16 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-2xl rounded-full flex items-center justify-center transition-colors duration-200 touch-manipulation border-4 border-white"
      style={{ position: 'fixed' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-7 h-7" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <MessageCircle className="w-7 h-7" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full"
              >
                {unreadCount}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 bg-primary-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
}
