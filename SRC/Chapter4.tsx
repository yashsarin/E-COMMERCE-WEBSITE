import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    title: 'The Final Challenge',
    content: [
      {
        type: 'narration',
        text: 'The Great Hall was transformed into a dueling arena. Students gathered around, their faces a mix of excitement and nervousness.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Blackwood',
        text: 'Welcome to your final test. Today, you\'ll demonstrate everything you\'ve learned about defensive magic.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1550985616-10810253b84d?ixlib=rb-4.0.3'
  },
  {
    title: 'The Duel',
    content: [
      {
        type: 'action',
        text: 'A brilliant flash of blue light erupts from the student\'s wand, meeting their opponent\'s spell in mid-air.'
      },
      {
        type: 'spell',
        text: 'Protego Maxima!',
        effect: 'shield'
      }
    ],
    background: 'https://images.unsplash.com/photo-1547393947-c60f9bef2555?ixlib=rb-4.0.3'
  }
];

const SpellEffect = ({ type }: { type: string }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{ duration: 1.5 }}
    >
      {type === 'shield' && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-xl" />
      )}
    </motion.div>
  );
};

const Chapter4 = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSpell, setShowSpell] = useState(false);

  const handleNext = () => {
    if (currentIndex < pages[currentPage].content.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (pages[currentPage].content[currentIndex + 1].type === 'spell') {
        setShowSpell(true);
      }
    } else if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setCurrentIndex(0);
      setShowSpell(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${pages[currentPage].background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
      >
        <Home className="w-6 h-6 text-white" />
      </button>

      {showSpell && <SpellEffect type="shield" />}

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">{pages[currentPage].title}</h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md p-4 bg-black/50 backdrop-blur-md rounded-lg text-white"
          >
            {pages[currentPage].content[currentIndex].type === 'dialogue' ? (
              <>
                <span className="font-bold">{pages[currentPage].content[currentIndex].speaker}: </span>
                {pages[currentPage].content[currentIndex].text}
              </>
            ) : pages[currentPage].content[currentIndex].type === 'spell' ? (
              <motion.div
                className="text-4xl font-bold text-blue-400 text-center"
                animate={{
                  scale: [1, 1.2, 1],
                  textShadow: [
                    "0 0 10px #3B82F6",
                    "0 0 20px #3B82F6",
                    "0 0 10px #3B82F6"
                  ]
                }}
                transition={{ duration: 1 }}
              >
                {pages[currentPage].content[currentIndex].text}
              </motion.div>
            ) : (
              pages[currentPage].content[currentIndex].text
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Chapter4;