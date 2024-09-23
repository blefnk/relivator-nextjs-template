import type { Variants } from "framer-motion";

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const staggerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
    y: 0,
  },
};

export const drawVariants: Variants = {
  animate: (index: number) => {
    const delay = 1 + index * 0.5;

    return {
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: { delay, duration: 0.01 },
        pathLength: { bounce: 0, delay, duration: 1.5, type: "spring" },
      },
    };
  },
  initial: { opacity: 0, pathLength: 0 },
};
