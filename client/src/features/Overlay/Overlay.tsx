import { useEffect, useRef } from 'react';
import { useAppContext } from '@/features';
import styles from './Overlay.module.scss';

interface OverlayProps {
   headerId: string;
}

export const Overlay: React.FC<OverlayProps> = ({ headerId }) => {
   const { overlayElement, overlayStatus, hideOverlay } = useAppContext();
   const elementRef = useRef<HTMLDivElement>(null);

   // --- attach scroll listener on overlay show
   useEffect(() => {
      const element = elementRef.current;
      const container = element?.parentElement ?? null;
      const header = document.getElementById(headerId);
      if (element === null || container === null || header === null) return undefined;

      const handleScroll = (): void => {
         if (overlayStatus === 'showing' || overlayStatus === 'visible') hideOverlay();
         const { scrollTop: currentContainerScroll } = container;
         const { scrollHeight: headerHeight } = header;
         const offset = Math.max(0, headerHeight - currentContainerScroll);
         element.style.top = [offset, 'px'].join('');
      };

      if (overlayStatus === 'showing') container.addEventListener('scroll', handleScroll);
      else if (overlayStatus === 'hidden') container.removeEventListener('scroll', handleScroll);
      return () => {
         container.removeEventListener('scroll', handleScroll);
      };
   }, [headerId, hideOverlay, overlayStatus]);

   return (
      <div
         ref={elementRef}
         className={[
            styles.overlay__outer,
            overlayStatus === 'hidden' ? styles.blockPointer : '',
         ].join(' ')}
      >
         <div className={styles.overlay__container}>
            <div
               className={[
                  styles.overlay,
                  overlayStatus === 'showing' || overlayStatus === 'visible'
                     ? styles.isVisible
                     : '',
               ].join(' ')}
            >
               <div className={styles.overlay__sidebar}>
                  <div />
               </div>
               <div className={styles.overlay__content}>{overlayElement}</div>
            </div>
         </div>
      </div>
   );
};
