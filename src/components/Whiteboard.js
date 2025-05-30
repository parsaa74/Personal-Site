import React, { useEffect, useRef, useState } from 'react';

const COLORS = {
  black: '#000000',
  red: '#ff4444',
  blue: '#4444ff',
  green: '#44aa44',
  yellow: '#ffcc44',
};

const TOOLS = {
  PEN: 'pen',
  ERASER: 'eraser',
  HIGHLIGHTER: 'highlighter',
};

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState(TOOLS.PEN);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(2);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const updateCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = COLORS[color];
      context.lineWidth = lineWidth;
      contextRef.current = context;

      // Maintain white background
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [color, lineWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    
    if (tool === TOOLS.HIGHLIGHTER) {
      contextRef.current.globalAlpha = 0.3;
    } else {
      contextRef.current.globalAlpha = 1;
    }
    
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToolConfig = (newTool) => {
    setTool(newTool);
    const context = contextRef.current;

    switch (newTool) {
      case TOOLS.ERASER:
        context.strokeStyle = 'white';
        context.lineWidth = 20;
        break;
      case TOOLS.HIGHLIGHTER:
        context.strokeStyle = COLORS[color];
        context.lineWidth = 20;
        break;
      case TOOLS.PEN:
        context.strokeStyle = COLORS[color];
        context.lineWidth = 2;
        break;
      default:
        break;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 1 // Ensure whiteboard is above background but below navigation
    }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onMouseMove={draw}
        onTouchMove={draw}
        onMouseUp={stopDrawing}
        onTouchEnd={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ 
          touchAction: 'none',
          cursor: tool === TOOLS.ERASER ? 'default' : 'crosshair'
        }}
      />
      <div style={{
        position: 'fixed',
        left: '20px',
        top: '20px',
        display: 'flex',
        gap: '10px',
        padding: '10px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 2
      }}>
        {/* Tools */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => setToolConfig(TOOLS.PEN)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: tool === TOOLS.PEN ? '2px solid #4444ff' : '1px solid #ddd',
              background: 'white',
              cursor: 'pointer'
            }}
            title="Pen"
          >
            ✏️
          </button>
          <button
            onClick={() => setToolConfig(TOOLS.HIGHLIGHTER)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: tool === TOOLS.HIGHLIGHTER ? '2px solid #4444ff' : '1px solid #ddd',
              background: 'white',
              cursor: 'pointer'
            }}
            title="Highlighter"
          >
            🌈
          </button>
          <button
            onClick={() => setToolConfig(TOOLS.ERASER)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: tool === TOOLS.ERASER ? '2px solid #4444ff' : '1px solid #ddd',
              background: 'white',
              cursor: 'pointer'
            }}
            title="Eraser"
          >
            🧽
          </button>
        </div>

        {/* Colors */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {Object.entries(COLORS).map(([colorName, colorValue]) => (
            <button
              key={colorName}
              onClick={() => {
                setColor(colorName);
                if (tool !== TOOLS.ERASER) {
                  contextRef.current.strokeStyle = colorValue;
                }
              }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: color === colorName ? '2px solid #4444ff' : '1px solid #ddd',
                background: colorValue,
                cursor: 'pointer'
              }}
              title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
            />
          ))}
        </div>

        {/* Clear button */}
        <button
          onClick={clearCanvas}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            background: 'white',
            cursor: 'pointer'
          }}
          title="Clear canvas"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Whiteboard; 