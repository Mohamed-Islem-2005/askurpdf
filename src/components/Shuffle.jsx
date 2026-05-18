import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

const Shuffle = ({
  text = "",
  className = "",
  shuffleDirection = "right",
  duration = 0.45,
  animationMode = "linear",
  shuffleTimes = 1,
  ease = "power3.out",
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = false,
  respectReducedMotion = true,
  loop = false,
  loopDelay = 0,
}) => {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const hasTriggered = useRef(false);

  const startShuffle = () => {
    if (isAnimating.current) return;
    if (triggerOnce && hasTriggered.current) return;

    if (respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    isAnimating.current = true;
    hasTriggered.current = true;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: 1,
      duration: duration + text.length * stagger,
      ease: ease,
      onUpdate: () => {
        const currentProgress = obj.val;
        const result = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            let charProgress = 0;
            if (shuffleDirection === "right") {
              const startDelay = index * stagger;
              charProgress = Math.max(0, Math.min(1, (currentProgress - startDelay) / duration));
            } else if (shuffleDirection === "left") {
              const startDelay = (text.length - 1 - index) * stagger;
              charProgress = Math.max(0, Math.min(1, (currentProgress - startDelay) / duration));
            } else {
              const startDelay = (index % 3) * stagger;
              charProgress = Math.max(0, Math.min(1, (currentProgress - startDelay) / duration));
            }

            if (charProgress >= 1) return char;
            if (charProgress > 0) {
              return DEFAULT_CHARS[Math.floor(Math.random() * DEFAULT_CHARS.length)];
            }
            return " ";
          })
          .join("");

        setDisplayText(result);
      },
      onComplete: () => {
        setDisplayText(text);
        isAnimating.current = false;
        if (loop) {
          setTimeout(startShuffle, loopDelay * 1000);
        }
      },
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startShuffle();
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [text, threshold, triggerOnce]);

  const handleMouseEnter = () => {
    if (triggerOnHover) startShuffle();
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block whitespace-pre-wrap select-none ${className}`}
    >
      {displayText}
    </span>
  );
};

export default Shuffle;
