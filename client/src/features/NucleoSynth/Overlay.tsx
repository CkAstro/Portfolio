import { memo } from 'react';
import { useNucleoContext } from './NucleoSynth';
import { Square } from './Square';

export const Overlay: React.FC = memo(() => {
   const { squares, config } = useNucleoContext();

   return (
      <svg width="100%" height="100%" className="fillContainer">
         <defs>
            <mask id="overlayMask">
               <rect width="100%" height="100%" fill="white" />
               {squares.map(({ x, y, id }) => (
                  <Square key={id} x={x} y={y} useGap={true} fill="black" config={config} />
               ))}
            </mask>
         </defs>
         <rect width="100%" height="100%" fill="var(--color-black)" mask="url(#overlayMask)" />
      </svg>
   );
});
