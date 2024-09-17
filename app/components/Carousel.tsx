// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
type Item = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
};

const items: Item[] = [
  {
    id: nanoid(),
    imgSrc: "/img/poster-endued-with-power.jpg",
    title: "Sunrise Splendor",
    description:
      "The first light of day illuminates the rugged peaks, casting a golden glow over the scenic landscape.",
  },
  {
    id: nanoid(),
    imgSrc: "/img/poster-monthly-friday-vigil.jpg",
    title: "Misty Mountain Pass",
    description:
      "A mysterious, fog-covered path winds through the serene and rugged mountain terrain.",
  },
  {
    id: nanoid(),
    imgSrc: "/img/poster-understanding-spiritual-things.jpg",
    title: "Pathway to Peaks",
    description:
      "A rugged path leads adventurers toward distant mountain peaks, promising breathtaking views and challenging terrain.",
  },
  {
    id: nanoid(),
    imgSrc: "/img/poster-tabernacle-of-david.jpg",
    title: "Eagle’s View",
    description:
      "An aerial perspective showcases the breathtaking expanse of the mountain range, revealing nature’s grand design.",
  },
  {
    id: nanoid(),
    imgSrc: "/img/poster-tuesday-weekly-service.jpg",
    title: "Alpine Twilight",
    description:
      "The last light of the day fades behind the alpine skyline, creating a striking silhouette against the twilight sky.",
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
              <img
                src={itemData?.imgSrc}
                alt="img"
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
