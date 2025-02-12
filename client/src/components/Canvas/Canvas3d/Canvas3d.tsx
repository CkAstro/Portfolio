import { useCallback, useEffect, useRef } from 'react';
import styles from './Canvas3d.module.scss';

export type DrawTrigger = Partial<{ [property: string]: number }>;
interface Canvas3dProps {
   renderFrame: (gl: WebGL2RenderingContext, options: DrawTrigger) => void;
   drawTrigger: Ref<DrawTrigger>;
   options?: Canvas3dOptions;
}

// type Canvas3dOptions = Pick<WebGLContextAttributes, 'antialias'>;
interface Canvas3dOptions {
   antialias?: boolean;
   floatingPointTextures?: boolean;
}

const timeArray = Array.from({ length: 11 }, (_, i) => Date.now() - i * 18);
let r = 0;

let t = Date.now();
export const Canvas3d: React.FC<Canvas3dProps> = ({ renderFrame, drawTrigger, options }) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const animationFrameId = useRef(0);
   const triggerComparison = useRef(drawTrigger.current);
   const drawControls = useRef({
      azimuthal: 0,
      polar: 0,
      zoom: -2,
   });
   const queueUpdate = useRef(false);

   const contextRef = useRef<WebGL2RenderingContext | null>(null);
   const renderRef = useRef(renderFrame);

   const frameRateRef = useRef(0);
   const updateFrameRate = useCallback(() => {
      // average of last 100 frames, updated every 10 frames
      if (r++ % 10 === 0) {
         const now = Date.now();
         // frameRateRef.current = 1000 / (now - t);
         t = now;
         timeArray.pop();
         timeArray.unshift(Date.now());
         frameRateRef.current = 100000 / (timeArray[0] - timeArray[10]);
         const hud = document.getElementById('canvas3d-hud');
         if (hud !== null) hud.innerHTML = `fps: ${frameRateRef.current.toFixed(2)}`;
      }
   }, []);

   useEffect(() => {
      renderRef.current = renderFrame;
   }, [renderFrame]);

   // animation loop - redraw will only occur if trigger is updated
   const animateCanvas = useCallback(() => {
      const ctx = contextRef.current;
      if (ctx === null) return;

      // if (drawTrigger.current !== triggerComparison.current) {
      //    updateFrameRate();
      //    triggerComparison.current = drawTrigger.current;
      //    renderRef.current(ctx, drawControls.current);
      // } else if (queueUpdate.current) {
      //    updateFrameRate();
      //    queueUpdate.current = false;
      //    renderRef.current(ctx, drawControls.current);
      // }

      updateFrameRate();
      queueUpdate.current = false;
      renderRef.current(ctx, drawControls.current);

      animationFrameId.current = requestAnimationFrame(animateCanvas);
      // }, [drawTrigger, updateFrameRate]);
   }, [updateFrameRate]);

   const optionsRef = useRef(options); // intentionally non-updating
   useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas === null) return;

      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      const { antialias, ...extensions } = optionsRef.current ?? {};

      contextRef.current = canvas.getContext('webgl2', { antialias } as WebGLContextAttributes);
      if (contextRef.current === null) {
         console.error('unable to create webgl2 context');
         return;
      }

      if (extensions.floatingPointTextures === true) {
         const ext = contextRef.current.getExtension('OES_texture_float_linear');
         if (ext === null) console.error('floating point texture extension not available.');
      }
   }, []);

   // init
   useEffect(() => {
      animationFrameId.current = requestAnimationFrame(animateCanvas);
      return () => {
         cancelAnimationFrame(animationFrameId.current);
      };
   }, [animateCanvas]);

   const pointerRef = useRef({ x: 0, y: 0, isActive: false });
   const handlePointerDown = useCallback((event: React.PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const { clientX, clientY } = event;
      pointerRef.current = { x: clientX, y: clientY, isActive: true };
   }, []);

   useEffect(() => {
      const handlePointerMove = (event: PointerEvent): void => {
         if (!pointerRef.current.isActive) return;
         event.preventDefault();
         event.stopPropagation();

         const { clientX, clientY } = event;
         const { x, y } = pointerRef.current;
         const deltaX = clientX - x;
         const deltaY = clientY - y;

         drawControls.current.azimuthal += deltaX / 180.0;
         drawControls.current.polar += deltaY / 180.0;
         queueUpdate.current = true;

         pointerRef.current.x = clientX;
         pointerRef.current.y = clientY;
      };

      const handleTouchMove = (event: TouchEvent): void => {
         event.preventDefault();
      };

      const handlePointerUp = (event: PointerEvent): void => {
         if (!pointerRef.current.isActive) return;
         event.preventDefault();
         event.stopPropagation();

         pointerRef.current.isActive = false;
      };

      const handlePointerEnter = (event: PointerEvent): void => {
         if (!pointerRef.current.isActive) return;
         event.preventDefault();
         event.stopPropagation();

         const { clientX, clientY } = event;
         pointerRef.current.x = clientX;
         pointerRef.current.y = clientY;
      };

      const handleWheel = (event: WheelEvent): void => {
         event.preventDefault();
         event.stopPropagation();

         const { deltaY } = event;
         drawControls.current.zoom -= deltaY / 120 / 5;
         queueUpdate.current = true;
      };

      const canvas = canvasRef.current;
      if (canvas === null) return undefined;

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('touchmove', handleTouchMove);
      canvas.addEventListener('pointerenter', handlePointerEnter);
      canvas.addEventListener('wheel', handleWheel);

      return () => {
         document.removeEventListener('pointermove', handlePointerMove);
         document.removeEventListener('pointerup', handlePointerUp);
         document.removeEventListener('touchmove', handleTouchMove);
         canvas.removeEventListener('pointerenter', handlePointerEnter);
         canvas.removeEventListener('wheel', handleWheel);
      };
   }, []);

   return (
      <div className={styles.canvas3d__wrapper}>
         <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            className={styles.canvas3d}
            width="100%"
            height="100%"
         />
         <div id="canvas3d-hud" className={styles.canvas3d__hud}>
            {frameRateRef.current}
         </div>
      </div>
   );
};
