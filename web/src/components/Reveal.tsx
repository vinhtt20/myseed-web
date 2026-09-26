"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades a block in once as it enters the viewport.
 * The server HTML cannot know the user's motion preference, so the `.reveal`
 * class lets CSS force the final state under prefers-reduced-motion (globals.css).
 * `fade={false}` keeps text fully opaque (use above the fold to protect LCP).
 */
export function Reveal({
  children,
  delay = 0,
  fade = true,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  fade?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduce ? false : { opacity: fade ? 0 : 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
