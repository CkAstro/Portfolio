import { elementMap } from './elementMap';
import type { NucleoConfig } from './nucleoConfig';

export interface SquareInfo {
   id: string;
   element: string;
   protons: number;
   neutrons: number;
   isStable: boolean;
   x: number;
   y: number;
}

export const genSquares = (
   config: NucleoConfig,
   width: number,
   height: number
): { squares: SquareInfo[]; maxWidth: number; maxHeight: number } => {
   const { size, leftOffset, bottomOffset } = config;

   const squares: SquareInfo[] = elementMap
      .map(({ element, protons, neutrons, isStable, getPosition }) => {
         const position = getPosition(size, width, height);
         if (position === null) return null;

         const { left, top } = position;
         if (top < -size || left > width) return null;
         return {
            id: `${element}-${neutrons}`,
            element,
            protons,
            neutrons,
            isStable,
            x: left + leftOffset,
            y: top - bottomOffset,
         };
      })
      .filter((val) => val !== null) as SquareInfo[];

   const maxCols = Math.max(...squares.map(({ neutrons }) => neutrons));
   const maxRows = Math.max(...squares.map(({ protons }) => protons));
   const maxWidth = maxCols * size - leftOffset;
   const maxHeight = maxRows * size + bottomOffset;

   return { squares, maxWidth, maxHeight };
};
