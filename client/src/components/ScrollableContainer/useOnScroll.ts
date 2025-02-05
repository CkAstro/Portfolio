import { useEffect, useRef } from 'react';
import { voidFunction } from '@/utils';

export type OnScroll = (scrollTop: number) => void;
type UseOnScroll = (containerRef: React.RefObject<HTMLDivElement>, onScroll?: OnScroll) => void;

export const useOnScroll: UseOnScroll = (containerRef, onScroll = voidFunction) => {
   const onScrollRef = useRef(onScroll);
   useEffect(() => {
      onScrollRef.current = onScroll;
   }, [onScroll]);

   useEffect(() => {
      const container = containerRef.current;
      if (container === null) return undefined;

      const handleScroll = (): void => {
         onScrollRef.current(container.scrollTop);
      };

      container.addEventListener('scroll', handleScroll);
      return () => {
         container.removeEventListener('scroll', handleScroll);
      };
   }, [containerRef]);
};
