import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    path: '',
    title: 'Defence Against the Dark Arts',
    content: [
      {
        type: 'narration',
        text: 'The air in the classroom was thick with anticipation as Professor Aldren stepped forward, his dark robes sweeping the floor. His sharp, hazel eyes scanned the room, taking in the nervous faces of his third-year students.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: "Today, we're going to confront something that every witch and wizard must learn to face: fear."
      },
      {
        type: 'narration',
        text: 'A ripple of murmurs spread through the class, but Aldren raised a hand to quiet them. He gestured toward the large, rattling wardrobe at the front of the room.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: 'Inside here is a Boggart. Does anyone know what a Boggart is?'
      }
    ],
    background: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3'
  },
  {
    path: 'boggart',
    title: 'The Boggart Lesson',
    content: [
      {
        type: 'dialogue',
        speaker: 'Aditya Klra',
        text: 'A Boggart is a shape-shifting creature that takes the form of whatever it believes will frighten us the most.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: 'Precisely. Boggarts thrive on fear. But, as with many dark creatures, they have a weakness. Laughter. The charm we will use today is called Riddikulus.'
      },
      {
        type: 'narration',
        text: 'He flicked his wand, and the wardrobe rattled ominously. Several students exchanged uneasy glances.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1598153346810-860daa814c4b?ixlib=rb-4.0.3'
  },
  {
    path: 'first-attempt',
    title: "Ms. Vance's Turn",
    content: [
      {
        type: 'narration',
        text: 'Ms Vance shuffled to the front, clutching her wand tightly. Professor Aldren waved his wand, and the wardrobe burst open. Out shot the Boggart, immediately transforming into a towering figure of her family doctor holding a gigantic needle, glowering menacingly.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: 'Focus, Ms Vance. What can you think of doing to make this doctor look ridiculous?'
      },
      {
        type: 'narration',
        text: 'Ms Vance’s eyes darted around the room, then lit up with an idea. She raised her wand.'
      },
      {
        type: 'spell',
        text: 'R-Riddikulus!',
        effect: 'apples'
      },
      {
        type: 'narration',
        text: 'There was a flash of light, and the Doctor-Boggart was suddenly a victim of a rainfall of ripe, juicy-looking red apples. The class erupted with laughter as the Doctor-Boggart frantically tried to remove the apples stuck in its syringe.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-4.0.3'
  },
  {
    path: 'conclusion',
    title: 'Lesson Learned',
    content: [
      {
        type: 'narration',
        text: 'One by one, students stepped forward to face their fears. Once Professor Aldren confirmed that no more students were left to practice, he moved toward the wardrobe.'
      },
      {
        type: 'dialogue',
        speaker: 'Professor Aldren',
        text: 'Fear is only as powerful as we allow it to be. Remember that courage isn’t the absence of fear, but the ability to face it. Well done, everyone.'
      },
      {
        type: 'narration',
        text: 'The students left, buzzing with excitement, each carrying a newfound confidence in their ability to confront the things that scared them most.'
      }
    ],
    background: 'https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?ixlib=rb-4.0.3'
  }
];

const Chapter1 = () => {
  return (
    <Routes>
      {pages.map((page, index) => (
        <Route
          key={index}
          path={page.path}
          element={<PageTemplate content={page.content} background={page.background} title={page.title} />}
        />
      ))}
    </Routes>
  );
};

export default Chapter1;