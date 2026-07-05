import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getImageUrl } from '../../utils/getImageUrl';

const ImageGallery = ({ images }) => {
  const [main, setMain] = useState(images[0]);

  return (
    <div>
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={main}
            src={getImageUrl(main)}
            alt="product"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {images.slice(0, 3).map((img, i) => (
          <button
            key={i}
            onClick={() => setMain(img)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${main === img ? 'border-brand-pink scale-95' : 'border-transparent'}`}
          >
            <img src={getImageUrl(img)} alt={`sub-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;