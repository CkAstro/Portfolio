import { useState } from 'react';
import type { OverlayStatus } from './useOverlay';

// const leftArrowPath = 'M12 4l-8 4.5M12 12l-8-4.5';
const rightArrowPath = 'M12 8.5l-8-4.5M12 7.5l-8 4.5';
const crossPath = 'M4 12l8-8M4 4l8 8';

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
            d={hasMouseOver || status === 'hiding' ? rightArrowPath : crossPath}
         />
      </svg>
   );
};
