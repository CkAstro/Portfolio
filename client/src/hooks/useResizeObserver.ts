import { useState, useRef, useLayoutEffect, useEffect } from 'react';
interface DOMSize {
   top: number;
   left: number;
   width: number;
   height: number;
}
export const useResizeObserver = <T extends HTMLElement | SVGElement = HTMLElement>(
   onResize?: (args: DOMSize) => unknown
): [React.RefObject<T>, DOMSize] => {
   const ref = useRef<T>(null);
   const [dimensions, setDimensions] = useState({ top: 0, left: 0, width: 0, height: 0 });

   const onResizeRef = useRef(onResize ?? ((): void => undefined));
   useEffect(() => {
      onResizeRef.current = onResize ?? ((): void => undefined);
   }, [onResize]);

   useLayoutEffect(() => {
      const updateDimensions = (): void => {
         const { top, left, width, height } = ref.current!.getBoundingClientRect();

         if (
            width === dimensions.width &&
            height === dimensions.height &&
            top === dimensions.top &&
            left === dimensions.left
         )
            return;

         setDimensions({ top, left, width, height });
         onResizeRef.current({ top, left, width, height });
      };

      const observerTarget = ref.current;
      const resizeObserver = new ResizeObserver(() => {
         updateDimensions();
      });

      const mutationObserver = new MutationObserver(() => {
         updateDimensions();
      });

      if (observerTarget !== null) {
         resizeObserver.observe(observerTarget);
         mutationObserver.observe(observerTarget, {
            attributes: true,
            attributeFilter: ['style'],
            childList: false,
            subtree: false,
         });
      }

      return () => {
         resizeObserver.disconnect();
         mutationObserver.disconnect();
      };
   }, [dimensions, onResizeRef, ref]);

   return [ref, dimensions];
};
