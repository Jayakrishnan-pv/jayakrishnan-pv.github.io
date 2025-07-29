"use client";
import React, { useEffect } from "react";

const Cursor: React.FC = () => {
  useEffect(() => {
    const dot = document.createElement("div");
    const outline = document.createElement("div");
    dot.className = "cursor-dot";
    outline.className = "cursor-outline";
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    // Helper to show/hide cursor based on width
    function isTouchDevice() {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    }
    function updateCursorVisibility() {
      if (isTouchDevice()) {
        dot.style.display = "none";
        outline.style.display = "none";
      } else {
        dot.style.display = "";
        outline.style.display = "";
      }
    }
    window.addEventListener("resize", updateCursorVisibility);
    updateCursorVisibility();

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    function animate() {
      outlineX = lerp(outlineX, mouseX, 0.18);
      outlineY = lerp(outlineY, mouseY, 0.18);
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      outline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
      requestAnimationFrame(animate);
    }

    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", mouseMove);
    animate();

    // Hover effect for links
    const addHover = (e: Event) => outline.classList.add("hover");
    const removeHover = (e: Event) => outline.classList.remove("hover");
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", updateCursorVisibility);
      document.body.removeChild(dot);
      document.body.removeChild(outline);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return null;
};

export default Cursor;
