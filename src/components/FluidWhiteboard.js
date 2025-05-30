import React, { useEffect, useRef } from 'react';

const FluidWhiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    contextRef.current = context;

    // Set white background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const handleResize = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(2, 2);
      context.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    isDrawingRef.current = true;
    lastPointRef.current = { x: offsetX, y: offsetY };
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawingRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    const currentPoint = { x: offsetX, y: offsetY };
    const dist = distance(lastPointRef.current, currentPoint);
    const angle = angle2Points(lastPointRef.current, currentPoint);

    for (let i = 0; i < dist; i += 1) {
      const x = lastPointRef.current.x + (Math.sin(angle) * i);
      const y = lastPointRef.current.y + (Math.cos(angle) * i);
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    }

    lastPointRef.current = currentPoint;
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    isDrawingRef.current = false;
  };

  const distance = (point1, point2) => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  const angle2Points = (point1, point2) => {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  };

  const addFluidEffect = (x, y) => {
    if (!isDrawingRef.current) return;

    const ctx = contextRef.current;
    const radius = 5;
    const strength = 0.5;

    for (let i = 0; i < Math.PI * 2; i += 0.1) {
      const offsetX = Math.cos(i) * radius;
      const offsetY = Math.sin(i) * radius;
      
      ctx.fillStyle = `rgba(0, 0, 0, ${strength * Math.random()})`;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={(e) => {
        draw(e);
        addFluidEffect(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        touchAction: 'none',
        background: 'white',
        zIndex: 1,
        fontFamily: 'Inter, sans-serif'
      }}
    />
  );
};

export default FluidWhiteboard; 