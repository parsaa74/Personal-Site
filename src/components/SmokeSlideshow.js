import React, { useEffect, useRef, useState } from 'react';

const SMOKE_IMAGES = Array.from({ length: 10 }, (_, i) => 
  `/smoke-image/smoke-image-${String(i + 1).padStart(3, '0')}.jpg`
);

const SmokeSlideshow = () => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const loadedImages = useRef([]);
  const animationFrameId = useRef(null);
  const lastMouseMove = useRef(Date.now());
  const isMoving = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
      lastMouseMove.current = Date.now();
      isMoving.current = true;
    };

    const loadImages = async () => {
      try {
        const imagePromises = SMOKE_IMAGES.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const verticalCanvas = document.createElement('canvas');
              const verticalCtx = verticalCanvas.getContext('2d');
              
              verticalCanvas.width = window.innerWidth;
              verticalCanvas.height = window.innerHeight;
              
              const scale = Math.max(
                window.innerWidth / img.width,
                window.innerHeight / img.height
              );
              
              const scaledWidth = img.width * scale;
              const scaledHeight = img.height * scale;
              const x = (window.innerWidth - scaledWidth) / 2;
              const y = (window.innerHeight - scaledHeight) / 2;
              
              verticalCtx.drawImage(img, x, y, scaledWidth, scaledHeight);
              
              const verticalImg = new Image();
              verticalImg.src = verticalCanvas.toDataURL();
              resolve(verticalImg);
            };
            img.onerror = reject;
            img.src = src;
          });
        });

        loadedImages.current = await Promise.all(imagePromises);
        setIsLoading(false);
        startAnimation();
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    const startAnimation = () => {
      let currentIndex = 0;
      let lastTime = 0;
      const frameInterval = 100;
      const moveThreshold = 100;

      const lerp = (start, end, factor) => {
        return start + (end - start) * factor;
      };

      const animate = (currentTime) => {
        if (Date.now() - lastMouseMove.current > moveThreshold) {
          isMoving.current = false;
        }

        targetPosition.current.x = lerp(targetPosition.current.x, mousePosition.current.x, 0.05);
        targetPosition.current.y = lerp(targetPosition.current.y, mousePosition.current.y, 0.05);

        if (currentTime - lastTime >= frameInterval && isMoving.current) {
          const img = loadedImages.current[currentIndex];
          
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          
          const distortX = (targetPosition.current.x - 0.5) * 100;
          const distortY = (targetPosition.current.y - 0.5) * 100;
          
          context.translate(canvas.width / 2, canvas.height / 2);
          context.transform(
            1 + targetPosition.current.x * 0.1,
            0,
            0,
            1 + targetPosition.current.y * 0.1,
            distortX,
            distortY
          );
          context.translate(-canvas.width / 2, -canvas.height / 2);
          
          context.fillStyle = '#000000';
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          context.globalCompositeOperation = 'difference';
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          context.globalCompositeOperation = 'multiply';
          context.fillStyle = 'rgba(0, 0, 0, 0.9)';
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          context.restore();

          if (isMoving.current) {
            currentIndex = (currentIndex + 1) % loadedImages.current.length;
          }
          lastTime = currentTime;
        }
        
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animationFrameId.current = requestAnimationFrame(animate);
    };

    loadImages();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000000',
      zIndex: 1
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ffffff'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default SmokeSlideshow; 