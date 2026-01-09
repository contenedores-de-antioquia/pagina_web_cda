"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1], // 🍎 Apple easing
        }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
