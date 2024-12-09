// @ts-nocheck

import type { EventsQueryType } from "~/sanity";

import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { IKImage } from "imagekitio-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

interface ICarouselProps {
  data: [
    EventsQueryType["schedule"]["poster"],
    ...EventsQueryType["events"][number]["poster"][]
  ];
}

function Carousel({ data }: ICarouselProps) {
  const [activeItem, setActiveItem] = useState(data[0]);
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
        {data.map((item, index) => {
          return (
            <motion.div
              key={nanoid()}
              className="min-w-[20rem] min-h-[20rem] p-2"
            >
              {/* TODO: configure fallback image. There should be a low-quality image blurred for this */}
              <img
                src={`${item.url}?w=300`}
                loading="lazy"
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
