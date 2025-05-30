import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import p5 from 'p5';
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const NavButtonsContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: auto;
  mix-blend-mode: difference;
`;

const NavButton = styled.div`
  color: white;
  font-family: 'Moderat';
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 3px;
  cursor: pointer;
  padding: 0.8rem 1.5rem;
  border: ${props => props.$isActive ? '2px solid white' : '1px solid rgba(255,255,255,0.3)'};
  position: relative;
  text-transform: uppercase;
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  background: ${props => props.$isActive ? 'rgba(255,255,255,0.1)' : 'transparent'};
  
  &:hover {
    transform: scale(1.05);
    border-color: white;
  }

  &:after {
    content: '';
    position: absolute;
    left: ${props => props.$isActive ? '0%' : '100%'};
    top: 0;
    width: ${props => props.$isActive ? '100%' : '0%'};
    height: 100%;
    background: rgba(255,255,255,0.1);
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover:after {
    left: 0;
    width: 100%;
  }
`;

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'contact', label: 'Contact' }
];

const BrutalistNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const canvasRef = useRef(null); // Comment out canvasRef
  // const p5Instance = useRef(null); // Comment out p5Instance
  const activeButtonRef = useRef(null);

  useEffect(() => {
    // Define the p5 sketch
    /* // Comment out entire sketch definition and instantiation
    const sketch = (p) => {
      let dim;
      let mousePressedState = false;
      
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('z-index', '1');
        
        dim = p.height / 3;
        p.background(0, 0, 60);
        
        // Make canvas events transparent to mouse
        canvas.elt.style.pointerEvents = 'none';
      };
      
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        dim = p.height / 3;
      };
      
      p.draw = () => {
        p.orbitControl(30, 30, 0.1);
        
        if (p.frameCount === 1) p.background(0, 0, 60);
        
        if (mousePressedState) {
          p.background(0, 0, 60);
          p.noFill();
          p.stroke(255);
          p.strokeWeight(0.5);
          p.box(2 * dim, dim + dim / 8, 2 * dim);
          p.frameCount = 0;
          mousePressedState = false;
        } else {
          let x, y, z;
          p.stroke(255, 255, 255, 100);
          p.strokeWeight(0.1);
          
          if (p.frameCount < 150) {
            y = dim / 2 + dim / 8;
            z = p.random(-2 * dim, 2 * dim);
            p.line(-2 * dim, y, z, 2 * dim, y, z);
            p.line(z, y, -2 * dim, z, y, 2 * dim);
          } else if (p.frameCount < 600) {
            p.rotateY(p.HALF_PI);
            y = dim / 2;
            let ys = 1;
            z = p.random(-dim * 1.1, dim * 1.1);
            p.line(-dim * 1.25, y, z, dim * 1.25, y, z);
            p.line(-dim * 1.25, y, z, -dim * 1.25, y + ys * dim / 8, z);
            p.line(dim * 1.25, y, z, dim * 1.25, y + ys * dim / 8, z);
            p.line(-dim * 1.25, y + ys * dim / 8, z, dim * 1.25, y + ys * dim / 8, z);
          } else if (p.frameCount < 1000) {
            x = p.random(-dim, dim);
            z = p.random([-dim, dim]);
            if (z === dim && Math.abs(x) < dim / 4) {
              p.line(x, -dim / 2, z, x, 0, z);
              p.line(x, -dim / 2, 0.95 * z, x, 0, 0.95 * z);
            } else {
              p.line(x, -dim / 2, z, x, dim / 2, z);
              p.line(x, -dim / 2, 0.95 * z, x, dim / 2, 0.95 * z);
            }
            x = p.random([-dim, dim]);
            z = p.random(-dim, dim);
            p.line(x, -dim / 2, z, x, dim / 2, z);
            p.line(x * 0.95, -dim / 2, z, x * 0.95, dim / 2, z);
          } else if (p.frameCount < 1400) {
            y = -dim / 2;
            let ys = -1;
            z = p.random(-dim * 1.25, dim * 1.25);
            p.line(-dim * 1.25, y, z, dim * 1.25, y, z);
            p.line(-dim * 1.25, y, z, -dim * 1.25, y + ys * dim / 8, z);
            p.line(dim * 1.25, y, z, dim * 1.25, y + ys * dim / 8, z);
            p.line(-dim * 1.25, y + ys * dim / 8, z, dim * 1.25, y + ys * dim / 8, z);
          } else if (p.frameCount < 1800) {
            p.rotateY(p.HALF_PI);
            y = -5 * dim / 8;
            z = p.random(-dim * 1.35, dim * 1.35);
            let ys = -1;
            p.line(-dim * 1.35, y, z, dim * 1.35, y, z);
            p.line(-dim * 1.35, y, z, -dim * 1.35, y + ys * dim / 12, z);
            p.line(dim * 1.35, y, z, dim * 1.35, y + ys * dim / 12, z);
            p.line(-dim * 1.35, y + ys * dim / 12, z, dim * 1.35, y + ys * dim / 12, z);
          } else {
            p.frameCount = 0;
            p.background(0, 0, 60);
          }
        }
      };
      
      p.triggerMousePressed = () => {
        mousePressedState = true;
      };
    };

    // Create a new p5 instance
    // p5Instance.current = new p5(sketch, canvasRef.current);

    // Handle cleanup
    return () => {
      // if (p5Instance.current) {
      //  p5Instance.current.remove();
      // }
    };
    */
  }, []);

  const handleNavClick = (path) => {
    // if (p5Instance.current) {
    //   p5Instance.current.triggerMousePressed();
    // }
    if (path === 'experiments') {
      // Navigate to home and trigger experiments section (custom handling needed)
      navigate('/');
      // Optionally, trigger a custom event or callback here
    } else {
      navigate(`/${path}`);
    }
  };

  // Determine active path
  const currentPath = location.pathname.substring(1); // Remove leading slash

  return (
    <NavContainer>
      {/* <CanvasWrapper ref={canvasRef} /> */}
      <NavButtonsContainer>
        {sections.map((section) => (
          <NavButton
            key={section.id}
            onClick={() => handleNavClick(section.id)}
            $isActive={currentPath === section.id}
            ref={currentPath === section.id ? activeButtonRef : null}
          >
            {section.label}
          </NavButton>
        ))}
      </NavButtonsContainer>
    </NavContainer>
  );
};

export default BrutalistNavigation; 