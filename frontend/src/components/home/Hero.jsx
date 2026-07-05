import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  { id: 1, title: 'Glow Naturally', subtitle: 'New Skincare Collection', image: 'https://i.ibb.co.com/RTSzs3xL/woman.jpg' },

  { id: 2, title: 'Bold Lips, Bold You', subtitle: 'Matte Lipstick Range', image: 'https://i.ibb.co.com/qL32cGNd/pexels-sandro-tavares-260503371-17568680.jpg' },

  { id: 3, title: 'Radiant Skin Awaits', subtitle: 'Up to 30% Off', image: 'https://i.ibb.co.com/tMgHF62Y/wom.jpg' },

  { id: 4, title: 'Jucy', subtitle: 'Up to 70% Off', image: 'https://i.ibb.co.com/pjdxmwRt/woman-Bikini.jpg' },

  { id: 5, title: 'Nuceeee', subtitle: 'Up to 40% Off', image: 'https://i.ibb.co.com/FbDQsHWD/margo-evardson-zx-Nb-Pp-HCTgw-unsplash.jpg' },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 px-6 md:px-20 text-white">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-6xl font-bold"
            >
              {slides[index].title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-3 text-lg md:text-2xl"
            >
              {slides[index].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;