import { useEffect, useRef } from 'react';
import { useNucleoContext } from './NucleoSynth';
import { Square } from './Square';

export const Spotlight: React.FC = () => {
   const { squares, config } = useNucleoContext();
   const containerRef = useRef<SVGSVGElement>(null);

   useEffect(() => {
      const container = containerRef.current;
      if (container === null) return undefined;

      const whiteLight = document.getElementById('whiteLight');
      const redLight = document.getElementById('redLight');
      if (whiteLight === null || redLight === null) return undefined;

      const handleMouseMove = (event: MouseEvent): void => {
         const { top, left } = container.getBoundingClientRect();
         const { clientX, clientY } = event;

         whiteLight.setAttribute('cx', `${clientX - left}`);
         whiteLight.setAttribute('cy', `${clientY - top}`);
         redLight.setAttribute('cx', `${clientX - left}`);
         redLight.setAttribute('cy', `${clientY - top}`);
      };

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) document.addEventListener('mousemove', handleMouseMove);
            else document.removeEventListener('mousemove', handleMouseMove);
         },
         { root: null, threshold: 0 }
      );
      observer.observe(container);

      return () => {
         observer.disconnect();
      };
   }, []);

   useEffect(() => {
      const whiteLight = document.getElementById('whiteLight');
      const redLight = document.getElementById('redLight');
      if (whiteLight === null || redLight === null) return;

      whiteLight.setAttribute('r', `${5 * config.size}`);
      redLight.setAttribute('r', `${5 * config.size}`);
   }, [config]);

   return (
      <svg ref={containerRef} width="100%" height="100%" className="fillContainer">
         <defs>
            <radialGradient id="whiteSpotlight">
               <stop offset="10%" stopColor="rgba(100, 100, 100, 0.5)" />
               <stop offset="70%" stopColor="rgba(100, 100, 100, 0.1)" />
               <stop offset="100%" stopColor="rgba(100, 100, 100, 0.0)" />
            </radialGradient>
            <radialGradient id="redSpotlight">
               <stop offset="10%" stopColor="rgba(150, 0, 0, 0.5)" />
               <stop offset="70%" stopColor="rgba(100, 0, 0, 0.1)" />
               <stop offset="100%" stopColor="rgba(100, 0, 0, 0.0)" />
            </radialGradient>
            <mask id="redMask">
               {squares
                  .filter(({ isStable }) => isStable)
                  .map(({ x, y, id }) => (
                     <Square key={id} x={x} y={y} fill="white" config={config} />
                  ))}
            </mask>
         </defs>

         <circle id="whiteLight" cx="0.5" cy="0.5" r="0.3" fill="url(#whiteSpotlight)" />

         <circle
            id="redLight"
            cx="0.5"
            cy="0.5"
            r="0.3"
            fill="url(#redSpotlight)"
            mask="url(#redMask)"
         />
      </svg>
   );
};
