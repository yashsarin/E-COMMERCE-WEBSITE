import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    title: 'The Forbidden Forest',
    content: [
      {
        type: 'narration',
        text: 'The moon cast eerie shadows through the ancient trees of the Forbidden Forest. A group of second-year students huddled together, their wands illuminating the darkness.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Silvanus',
        text: 'Tonight, we\'ll be studying one of the most fascinating magical creatures - Thestrals.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1516166328576-82e16a127024?ixlib=rb-4.0.3'
  },
  {
    title: 'Meeting the Thestrals',
    content: [
      {
        type: 'action',
        text: 'A shadowy, skeletal figure emerges from between the trees, its leathery wings folded against its body.'
      },
      {
        type: 'dialogue',
        speaker: 'Luna',
        text: 'They\'re quite gentle, really. They just have a bad reputation because of their appearance.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1478001517127-fccc92f54906?ixlib=rb-4.0.3'
  }
];

const Creature = ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? [0, -20, 0] : 0
      }}
      transition={{ 
        duration: 1,
        y: {
          repeat: Infinity,
          duration: 2
        }
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const Chapter2 = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCreature, setShowCreature] = useState(false);

  const handleNext = () => {
    if (currentIndex < pages[currentPage].content.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (pages[currentPage].content[currentIndex + 1].type === 'action') {
        setShowCreature(true);
      }
    } else if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setCurrentIndex(0);
      setShowCreature(false);
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

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">{pages[currentPage].title}</h1>

        {showCreature && (
          <Creature isVisible={showCreature}>
            <div className="w-64 h-64 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
              <motion.div
                className="w-48 h-48 bg-black/60 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              />
            </div>
          </Creature>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md p-4 bg-black/50 backdrop-blur-md rounded-lg text-white mt-8"
          >
            {pages[currentPage].content[currentIndex].type === 'dialogue' ? (
              <>
                <span className="font-bold">{pages[currentPage].content[currentIndex].speaker}: </span>
                {pages[currentPage].content[currentIndex].text}
              </>
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

export default Chapter2;