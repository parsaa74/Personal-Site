import React, { useEffect, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';

const AsciiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: lighten;
`;

const AsciiContent = styled.div`
  font-family: 'Moderat';
  white-space: pre;
  line-height: 1.2;
  font-size: clamp(6px, 1vw, 10px);
  user-select: none;
  color: #ffffff;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
`;

const AsciiBackground = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const chars = '.:=+*#%@';
  const cols = Math.floor(window.innerWidth / 20);
  const rows = Math.floor(window.innerHeight / 20);
  const frameRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        
        frameRef.current = requestAnimationFrame(() => {
          setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
          });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const generateAscii = useMemo(() => {
    const ascii = [];
    for (let y = 0; y < rows; y++) {
      let row = '';
      for (let x = 0; x < cols; x++) {
        const distanceFromMouse = Math.sqrt(
          Math.pow((x / cols) - mousePos.x, 2) + 
          Math.pow((y / rows) - mousePos.y, 2)
        );
        const charIndex = Math.floor(distanceFromMouse * chars.length * 1.5);
        const char = chars[Math.min(charIndex, chars.length - 1)] || ' ';
        row += char;
      }
      ascii.push(row);
    }
    return ascii;
  }, [mousePos.x, mousePos.y, cols, rows]);

  return (
    <AsciiContainer>
      <AsciiContent ref={containerRef}>
        {generateAscii.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </AsciiContent>
    </AsciiContainer>
  );
};

export default AsciiBackground; 