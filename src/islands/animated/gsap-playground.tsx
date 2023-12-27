"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @see https://gsap.com
 * @see https://gsap.com/docs/v3/React/tools/useGSAP
 */

export default function ScrollAnimatedGsap() {
  const main = useRef();

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".box");
      // biome-ignore lint/complexity/noForEach: <explanation>
      boxes.forEach((box) => {
        // @ts-expect-error ...
        gsap.to(box, {
          x: 150,
          scrollTrigger: {
            trigger: box,
            start: "bottom bottom",
            end: "top 20%",
            scrub: true,
            // markers: true,
          },
        });
      });
    },
    { scope: main },
  );

  // GSAP PLAYGROUND (1/2)
  // @see https://gsap.com/docs/v3/React/tools/useGSAP
  /* const container = useRef();
  const tl = useRef();
  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };
  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".box");
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, "<")
        .to(boxes[2], { y: -166 })
        .reverse();
    },
    { scope: container },
  ); */
  // useGSAP(() => {}, {
  //   dependencies: [],
  //   scope: container,
  //   revertOnUpdate: true,
  // });

  return (
    <div>
      <section className="section flex-center column">
        <h2>Basic ScrollTrigger with React</h2>
        <p>Scroll down to see the magic happen!!</p>
      </section>
      {/* @ts-expect-error ... */}
      <div className="section flex-center column" ref={main}>
        <div className="box gradient-blue">box</div>
        <div className="box gradient-blue">box</div>
        <div className="box gradient-blue">box</div>
      </div>
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <section className="section"></section>

      {/* GSAP PLAYGROUND (2/2) */}
      {/* <section className="boxes-container" ref={container}>
        <h2>Use the button to toggle a Timeline</h2>
        <div>
          <button type="button" onClick={toggleTimeline}>
            Toggle Timeline
          </button>
        </div>
        <div className="box gradient-blue">Box 1</div>
        <div className="box gradient-blue">Box 2</div>
        <div className="box gradient-blue">Box 3</div>
      </section> */}
    </div>
  );
}
