"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.tagName?.toLowerCase() === "input" ||
        target.tagName?.toLowerCase() === "textarea" ||
        target.closest("[role='button']");
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", updateHoverState);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", updateHoverState);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Crosshair Lines - Vertical */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 1.5,
          backgroundColor: "var(--foreground)",
        }}
        animate={{
          x: mousePosition.x - 0.75,
          y: mousePosition.y - (isHovering ? 20 : 12),
          height: isHovering ? 40 : 24,
          opacity: isVisible ? (isHovering ? 0 : 0.25) : 0,
          scaleY: isClicking ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.2,
        }}
      />
      {/* Crosshair Lines - Horizontal */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          height: 1.5,
          backgroundColor: "var(--foreground)",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 12),
          y: mousePosition.y - 0.75,
          width: isHovering ? 40 : 24,
          opacity: isVisible ? (isHovering ? 0 : 0.25) : 0,
          scaleX: isClicking ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.2,
        }}
      />
      {/* Center Dot */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: "var(--gold)",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 3),
          y: mousePosition.y - (isHovering ? 24 : 3),
          width: isHovering ? 48 : 6,
          height: isHovering ? 48 : 6,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.3,
        }}
      />
      {/* Hover Label */}
      <AnimatePresence>
        {isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed pointer-events-none z-[9999] text-[9px] font-black uppercase tracking-[0.3em] text-background"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
            }}
            transition={{ duration: 0.15 }}
          >
            View
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}
