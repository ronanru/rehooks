"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Text({ text }: { text: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (svgRect) {
        const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
        setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
      }
    };

    const svgElement = svgRef.current;
    svgElement?.addEventListener("mousemove", handleMouseMove);

    return () => {
      svgElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-default select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={"var(--green-400)"} />
          <stop offset="100%" stopColor={"var(--green-400)"} />
        </linearGradient>

        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
          r="20%"
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.8"
        className="fill-transparent stroke-neutral-300 font-mono text-8xl font-bold tracking-tighter dark:stroke-neutral-800/50"
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.8"
        className="fill-transparent stroke-neutral-300 font-mono text-8xl font-bold tracking-tighter dark:stroke-neutral-800/50"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.8"
        mask="url(#textMask)"
        className="fill-transparent font-mono text-8xl font-bold tracking-tighter"
      >
        {text}
      </text>
    </svg>
  );
}
