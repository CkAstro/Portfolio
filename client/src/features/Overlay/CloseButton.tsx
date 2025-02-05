import { useState } from 'react';
import type { OverlayStatus } from './useOverlay';

export const CloseButton: React.FC<{ status: OverlayStatus; onClick: () => void }> = ({
   status,
   onClick,
}) => {
   const [hasMouseOver, setHasMouseOver] = useState(false);

   return (
      <svg
         role="button"
         onClick={onClick}
         onKeyDown={onClick}
         tabIndex={0}
         viewBox="0 0 16 16"
         onPointerEnter={(): void => setHasMouseOver(true)}
         onPointerLeave={(): void => setHasMouseOver(false)}
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            strokeWidth={2}
            fill="none"
            // stroke="var(--color-black)"
            d="M2.5 4l8 8"
            transform={
               hasMouseOver
                  ? 'translate(0, -3.5)'
                  : status === 'showing'
                  ? 'translate(0, 3.5)'
                  : 'translate(0, 0)'
            }
         />
         <path
            strokeWidth={2}
            fill="none"
            // stroke="var(--color-black)"
            d="M2.5 12l8-8"
            transform={
               hasMouseOver
                  ? 'translate(0, 3.5)'
                  : status === 'showing'
                  ? 'translate(0, -3.5)'
                  : 'translate(0, 0)'
            }
         />
      </svg>
   );
};
