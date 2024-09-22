// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { IKImage } from "imagekitio-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

type Item = {
  id: string;
  imgSrc: string;
};

const items: Item[] = [
  {
    id: nanoid(),
    imgSrc: "RCN/poster-september-schedule.jpg",
  },
  {
    id: nanoid(),
    imgSrc: "RCN/poster-endued-with-power.jpg",
  },
  {
    id: nanoid(),
    imgSrc: "RCN/poster-understanding-spiritual-things.jpg",
  },
];

function Carousel() {
  const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);
  return (
    <motion.div className="w-full overflow-x-hidden dark:bg-gray-900/60 bg-gray-100/60">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex will-change-transform cursor-grab active:cursor-grabbing"
      >
        {items?.map((itemData, index) => {
          return (
            <motion.div
              key={nanoid()}
              className="min-w-[20rem] min-h-[20rem] p-2"
            >
              <IKImage
                path={itemData?.imgSrc}
                transformation={[{ width: "360", height: "360" }]}
                lqip={{ active: true, quality: 10 }}
                loading="lazy"
                alt={`upcoming event ${index + 1}`}
                className="w-[360px] md:w-[480px] h-[360px] object-cover pointer-events-none  rounded-md"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default Carousel;
