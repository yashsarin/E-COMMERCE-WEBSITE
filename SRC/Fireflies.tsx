import React, { useEffect } from 'react';

interface FirefliesProps {
  count: number;
}

const Fireflies: React.FC<FirefliesProps> = ({ count }) => {
  useEffect(() => {
    const container = document.getElementById('fireflies-container');
    const fireflies: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      firefly.style.left = `${Math.random() * 100}vw`;
      firefly.style.top = `${Math.random() * 100}vh`;
      firefly.style.animationDelay = `${Math.random() * 3}s`;
      container?.appendChild(firefly);
      fireflies.push(firefly);
    }

    return () => {
      fireflies.forEach(firefly => firefly.remove());
    };
  }, [count]);

  return <div id="fireflies-container" className="fixed inset-0 pointer-events-none" />;
};

export default Fireflies;