import type { NucleoConfig } from './nucleoConfig';

interface SquareProps {
   x: number;
   y: number;
   fill: string;
   config: NucleoConfig;
   useGap?: boolean;
}

export const Square: React.FC<SquareProps> = ({ x, y, fill, config, useGap }) => {
   const gap = useGap === true ? 0.5 * config.gap : 0;

   return (
      <rect
         x={x + gap}
         y={y + gap}
         width={config.size - 2 * gap}
         height={config.size - 2 * gap}
         fill={fill}
      />
   );
};
