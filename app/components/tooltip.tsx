"use client";

import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useState } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="
              absolute top-full left-1/2 -translate-x-1/2 mt-2
              rounded-md bg-black px-3 py-1.5
              text-sm text-white whitespace-nowrap
              shadow-lg z-50
            "
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
