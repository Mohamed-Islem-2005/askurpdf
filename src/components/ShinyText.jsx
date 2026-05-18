import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ShinyText = ({
  text = "",
  className = "",
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
}) => {
  const spanRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (disabled || !spanRef.current) return;

    const el = spanRef.current;

    const startX = direction === "left" ? "150%" : "-50%";
    const endX = direction === "left" ? "-50%" : "150%";

    gsap.set(el, {
      backgroundImage: `linear-gradient(
        105deg,
        ${color} 0%,
        ${color} calc(50% - ${spread / 2}px),
        ${shineColor} 50%,
        ${color} calc(50% + ${spread / 2}px),
        ${color} 100%
      )`,
      backgroundSize: "200% 100%",
      backgroundPosition: startX,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
    });

    tweenRef.current = gsap.to(el, {
      backgroundPosition: endX,
      duration: speed,
      delay,
      ease: "linear",
      repeat: -1,
      yoyo,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [text, speed, delay, color, shineColor, spread, direction, yoyo, disabled]);

  const handleMouseEnter = () => {
    if (pauseOnHover) tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) tweenRef.current?.resume();
  };

  return (
    <span
      ref={spanRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {text}
    </span>
  );
};

export default ShinyText;
