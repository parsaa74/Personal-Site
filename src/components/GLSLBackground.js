import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

const GLSLBackground = () => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      setError('WebGL2 not supported');
      return;
    }

    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Set the canvas size in pixels
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      
      // Set the viewport to match
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const vertexShaderSource = `#version 300 es
      in vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    const fragmentShaderSource = `#version 300 es
      precision highp float;
      uniform vec2 r;
      uniform float t;
      out vec4 fragColor;

      vec3 hsv(float h, float s, float v) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
        return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
      }

      void main() {
        // Correct aspect ratio
        vec2 uv = (gl_FragCoord.xy - 0.5 * r.xy) / min(r.x, r.y);
        float i, e, R, s;
        vec3 q, p, d = vec3(uv.x, uv.y * (r.y/r.x), 1.);
        vec3 o = vec3(0);
        
        for (q.zy--; i++ < 119.; ) {
          o.rgb += hsv(-p.y, R * p.y, min(R * e * s - q.z, R) / 9.);
          s = 1.;
          p = q += d * e * R * .22;
          p = vec3(log2(R = length(p)) - t, exp(-p.z / R) + R, atan(p.y, p.x) * s);
          for (e = --p.y; s < 9e2; s += s)
            e += dot(sin(p.yzx * s), .4 + cos(p.yxy * s + t)) / s * .2;
        }
        fragColor = vec4(o, 1);
      }
    `;

    try {
      // Create and compile shaders
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.shaderSource(fragmentShader, fragmentShaderSource);

      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);

      // Create program
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      // Set up attributes and uniforms
      const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
      const resolutionUniformLocation = gl.getUniformLocation(program, 'r');
      const timeUniformLocation = gl.getUniformLocation(program, 't');

      // Create buffer
      const positionBuffer = gl.createBuffer();
      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]);

      // Set up VAO
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // Initial resize
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      // Animation
      let animationFrameId;
      const startTime = performance.now();

      const render = () => {
        const currentTime = performance.now();
        const t = (currentTime - startTime) * 0.001;

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        // Update uniforms
        gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
        gl.uniform1f(timeUniformLocation, t);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener('resize', setCanvasSize);
        cancelAnimationFrame(animationFrameId);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
        gl.deleteVertexArray(vao);
      };
    } catch (err) {
      console.error('Shader error:', err);
      setError(err.message);
    }
  }, []);

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
      {error && (
        <div style={{ color: 'white', padding: '20px' }}>
          Error: {error}
        </div>
      )}
    </CanvasContainer>
  );
};

export default GLSLBackground; 