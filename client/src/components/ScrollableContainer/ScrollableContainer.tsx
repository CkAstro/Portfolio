import { useCallback } from 'react';
import { useObserveSections } from './useObserveSections';
import styles from './ScrollableContainer.module.scss';

type ValidChild = React.ReactElement<{ id: string }>;
type ScrollTo = (id: string, timescale?: number) => void;
type NavbarConstructor = (
   sections: string[],
   currentSection: { index: number; id: string } | null,
   scrollTo: ScrollTo
) => React.ReactNode;
interface ScrollableContainerProps {
   children: ValidChild[];
   header?: ValidChild;
   navbar: NavbarConstructor;
   containerId: string;
}

const easeOut = (p: number): number => p * (2 - p);
const timingFunction = (timescale: number, delta: number, total: number): number =>
   timescale * Math.abs(delta / total) ** 0.6;

const TIMESCALE = 1000;

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
   children,
   header,
   navbar,
   containerId,
}) => {
   const [containerRef, idList, visibleSection] = useObserveSections(children);

   const scrollTo = useCallback(
      (id: string) => {
         const container = containerRef.current;
         if (container === null) return;

         const targetElement = document.getElementById(id);
         if (targetElement === null) return;

         const startLocation = container.scrollTop;
         const targetLocation = targetElement.offsetTop;
         const distance = targetLocation - startLocation;
         const netTime = timingFunction(TIMESCALE, distance, container.scrollHeight);

         // --- smoothScroll
         let startTime: number | null = null;
         const scrollFrame = (currentTime: number): void => {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = elapsedTime / netTime;

            const nextPosition = easeOut(progress) * distance + startLocation;
            if (netTime - elapsedTime < 1) container.scrollTo(0, targetLocation);
            else {
               container.scrollTo(0, nextPosition);
               requestAnimationFrame(scrollFrame);
            }
         };

         requestAnimationFrame(scrollFrame);
      },
      [containerRef]
   );

   return (
      <div
         ref={containerRef}
         id={containerId}
         className={[styles.scrollableContainer, 'scrollable', 'noscrollbar'].join(' ')}
      >
         {header ?? null}
         {children}
         {navbar(idList, visibleSection, scrollTo)}
      </div>
   );
};
