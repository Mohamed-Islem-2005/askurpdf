import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  ElementType = 'div',
  animateOnScroll = true,
  scrub = true
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="inline-block word" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll('.inline-block.word');

    const animationProps = {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: stagger,
    };

    if (animateOnScroll) {
      animationProps.scrollTrigger = {
        trigger: el,
        start: scrollStart,
        end: scrollEnd,
        scrub: scrub
      };
    }

    gsap.fromTo(charElements, {
      willChange: 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%'
    }, animationProps);
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, animateOnScroll, scrub]);

  return (
    <ElementType
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}>
      <span
        className={`inline-block ${textClassName}`}>{splitText}</span>
    </ElementType>
  );
};

export default ScrollFloat;
