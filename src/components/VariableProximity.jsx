import { useRef, useEffect, useState } from 'react';

const VariableProximity = ({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 100,
  falloff = 'linear',
  className = ''
}) => {
  const lettersRef = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  const calculateProximity = (letterEl) => {
    if (!letterEl) return 0;
    const rect = letterEl.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const letterX = rect.left - containerRect.left + rect.width / 2;
    const letterY = rect.top - containerRect.top + rect.height / 2;
    
    const dist = Math.hypot(mousePos.x - letterX, mousePos.y - letterY);
    
    if (dist > radius) return 0;
    
    if (falloff === 'linear') {
      return 1 - dist / radius;
    }
    return 0;
  };

  const parseSettings = (settingsStr) => {
    const settings = {};
    const matches = settingsStr.match(/'(\w+)'\s+(\d+)/g);
    if (matches) {
      matches.forEach(match => {
        const [_, key, value] = match.match(/'(\w+)'\s+(\d+)/);
        settings[key] = parseFloat(value);
      });
    }
    return settings;
  };

  const fromSettings = parseSettings(fromFontVariationSettings);
  const toSettings = parseSettings(toFontVariationSettings);

  return (
    <span className={className}>
      {label.split('').map((char, index) => {
        const proximity = calculateProximity(lettersRef.current[index]);
        
        const currentSettings = {};
        Object.keys(fromSettings).forEach(key => {
          const fromVal = fromSettings[key];
          const toVal = toSettings[key];
          currentSettings[key] = fromVal + (toVal - fromVal) * proximity;
        });
        
        const style = {
          fontVariationSettings: Object.entries(currentSettings)
            .map(([key, val]) => `'${key}' ${val}`)
            .join(', '),
          display: 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : 'normal'
        };

        return (
          <span
            key={index}
            ref={el => lettersRef.current[index] = el}
            style={style}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default VariableProximity;
