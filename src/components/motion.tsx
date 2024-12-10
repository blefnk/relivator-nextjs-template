"use client";

import { motion, AnimatePresence as MotionPresence } from "framer-motion";
import * as React from "react";
import {
  useInView,
  type IntersectionObserverProps,
} from "react-intersection-observer";

import { cn } from "~/server/utils";

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const AnimatePresence = MotionPresence;

type MotionShellProps = {
  delay?: IntersectionObserverProps["delay"];
  threshold?: IntersectionObserverProps["threshold"];
  once?: IntersectionObserverProps["triggerOnce"];
  margin?: IntersectionObserverProps["rootMargin"];
} & React.ComponentPropsWithoutRef<typeof motion.div>;

export function MotionShell({
  delay = 100,
  threshold = 0.5,
  once = true,
  margin = "0px 0px 0px 0px",
  ...props
}: MotionShellProps) {
  const { ref, inView } = useInView({
    delay,
    threshold,
    triggerOnce: once,
    rootMargin: margin,
  });

  return (
    <MotionDiv
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      {...props}
    />
  );
}
