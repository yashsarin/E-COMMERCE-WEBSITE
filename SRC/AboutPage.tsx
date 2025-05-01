import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3)',
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

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-2xl text-white p-8 bg-black/50 backdrop-blur-md rounded-lg">
          <h1 className="text-4xl font-bold mb-6">The Story of Magic</h1>
          <p className="text-lg mb-4">
            Welcome to a world where magic isn't just a dream, but a reality. In this enchanting tale,
            we follow the journey of young wizards and witches as they discover their powers and learn
            to master the magical arts.
          </p>
          <p className="text-lg mb-4">
            Through four captivating chapters, you'll experience the wonder of first spells, the
            thrill of magical creatures, and the power of friendship that transcends the ordinary
            world.
          </p>
          <p className="text-lg">
            Begin your magical journey by exploring each chapter, where every page brings new
            adventures and mysteries to uncover.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;