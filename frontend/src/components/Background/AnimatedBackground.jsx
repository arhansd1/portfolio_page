import { useState, useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const boxes = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 100 + Math.random() * 200,
      height: 100 + Math.random() * 200,
      rotation: Math.random() * 360,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      scale: 0.8 + Math.random() * 0.4,
      baseOpacity: 0.2 + Math.random() * 0.1 // Base opacity for each box
    }))
  );

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrameId;
    const startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      
      boxes.current.forEach((box) => {
        const element = document.getElementById(`bg-box-${box.id}`);
        if (!element) return;

        // Calculate box center position
        const boxLeft = (box.left / 100) * window.innerWidth;
        const boxTop = (box.top / 100) * window.innerHeight;
        const boxCenterX = boxLeft + (box.width / 2);
        const boxCenterY = boxTop + (box.height / 2);
        
        // Calculate distance from mouse to box center
        const distance = Math.sqrt(
          Math.pow(mousePos.x - boxCenterX, 2) + 
          Math.pow(mousePos.y - boxCenterY, 2)
        );
        
        // Calculate mouse interaction effect (0 to 1)
        const maxDistance = 300; // pixels
        const mouseEffect = Math.max(0, 1 - (distance / maxDistance));
        
        // Calculate pulsing effect
        const pulse = (Math.sin(time * box.speed + box.phase) + 1) * 0.015 + 0.01;
        
        // Apply mouse interaction (scale up to 0.2 and increase brightness)
        const scaleEffect = 0.2 * mouseEffect; // Up to 0.2 scale increase
        const brightnessEffect = 0.4 * mouseEffect; // Up to 0.4 opacity increase
        
        // Apply styles with smooth transitions
        element.style.opacity = `${box.baseOpacity + pulse + brightnessEffect}`;
        element.style.transform = `rotate(${box.rotation}deg) scale(${box.scale + scaleEffect})`;
        element.style.transition = 'opacity 0.8s ease-out, transform 1s ease-out';
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]); // Re-run when mouse position changes

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {boxes.current.map((box) => (
        <div
          key={box.id}
          id={`bg-box-${box.id}`}
          className="absolute border border-white/5"
          style={{
            left: `${box.left}%`,
            top: `${box.top}%`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            opacity: box.baseOpacity,
            transform: `rotate(${box.rotation}deg) scale(${box.scale})`,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            transition: 'opacity 0.8s ease-out, transform 1s ease-out',
            willChange: 'opacity, transform',
            pointerEvents: 'none',
            borderRadius: '4px'
          }}
        />
      ))}
    </div>
  );
}