import { useCallback, useState } from 'react';

type OverlayElement = React.ReactElement | null;
export interface OverlayContext {
   overlayElement: OverlayElement;
   showOverlay: (element: OverlayElement) => void;
   hideOverlay: () => void;
   overlayStatus: OverlayStatus;
}

export type OverlayStatus = 'visible' | 'hidden' | 'hiding' | 'showing';
export const OVERLAY_ANIMATION_MS = 500;

export const useOverlay = (): OverlayContext => {
   const [overlayElement, setOverlayElement] = useState<React.ReactElement | null>(null);
   const [overlayStatus, setOverlayStatus] = useState<OverlayStatus>('hidden');

   const showOverlay = useCallback((element: OverlayElement) => {
      setOverlayElement(element);
      setOverlayStatus('showing');
      setTimeout(() => {
         setOverlayStatus('visible');
      }, OVERLAY_ANIMATION_MS);
   }, []);

   const hideOverlay = useCallback(() => {
      setOverlayStatus('hiding');
      setTimeout(() => {
         setOverlayStatus('hidden');
      }, OVERLAY_ANIMATION_MS);
   }, []);

   return { overlayElement, showOverlay, hideOverlay, overlayStatus };
};
