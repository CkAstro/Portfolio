import {
   forwardRef,
   useCallback,
   useImperativeHandle,
   useLayoutEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import styles from './AnimatedCube.module.scss';

type ValidFace = 'left' | 'right' | 'top' | 'bottom' | 'front' | 'back';
type AlternateFace = Omit<ValidFace, 'front' | 'back'>;
interface AnimatedCubeProps {
   children: React.ReactNode;
   altFace: React.ReactNode;
   altFacePosition: AlternateFace;
   perspective?: number;
   animationMs?: number;
   className?: string;
   style?: React.CSSProperties;
}

export interface AnimatedCubeControls {
   // toFace: (face: ValidFace) => void;
   toMainFace: () => void;
   toAltFace: () => void;
   // face: 'main' | 'alt';
}

type FaceType = 'main' | 'alt';

export const AnimatedCube = forwardRef<AnimatedCubeControls, AnimatedCubeProps>(
   (
      {
         children,
         altFace,
         altFacePosition,
         perspective,
         animationMs = 250,
         className: classNameProp,
         style: styleProp,
      },
      ref
   ) => {
      const [isTransitioning, setIsTransitioning] = useState(false);
      const [faceType, setFaceType] = useState<FaceType>('main');

      const mainRef = useRef<HTMLDivElement>(null);
      const altRef = useRef<HTMLDivElement>(null);

      useLayoutEffect(() => {
         const mainContainer = mainRef.current;
         if (mainContainer === null) return;

         const parent = mainContainer.parentElement;
         if (parent === null) return;

         const { width, height } = mainContainer.getBoundingClientRect();
         const majorAxis =
            altFacePosition === 'left' || altFacePosition === 'right' ? width : height;
         const minorAxis =
            altFacePosition === 'left' || altFacePosition === 'right' ? height : width;
         parent.style.width = `${width}px`;
         parent.style.height = `${height}px`;
         parent.style.setProperty('--origin', `50% 50% -${0.5 * majorAxis}px`);
         parent.style.setProperty('transition', `transform ${animationMs}ms ease`);

         const wrapper = parent.parentElement;
         if (wrapper === null) return;

         wrapper.style.perspective = `${perspective ?? 2 * minorAxis}px`;
      }, [altFacePosition, animationMs, perspective]);

      const timeoutRef = useRef<TimeoutHandle>(null);
      const toMainFace = useCallback(() => {
         const mainContainer = mainRef.current;
         const altContainer = altRef.current;
         if (mainContainer === null || altContainer === null) return;

         if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
         mainContainer.style.display = 'unset';
         setIsTransitioning(true);
         setFaceType('main');
         timeoutRef.current = setTimeout(() => {
            altContainer.style.display = 'none';
         }, animationMs);
      }, [animationMs]);
      const toAltFace = useCallback(() => {
         const mainContainer = mainRef.current;
         const altContainer = altRef.current;
         if (mainContainer === null || altContainer === null) return;

         if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
         altContainer.style.display = 'unset';
         setIsTransitioning(true);
         setFaceType('alt');
         timeoutRef.current = setTimeout(() => {
            mainContainer.style.display = 'none';
         }, animationMs);
      }, [animationMs]);

      useImperativeHandle(ref, () => ({
         toMainFace,
         toAltFace,
      }));

      const parentClassName = useMemo(() => {
         return [
            styles.cubeContainer,
            styles[altFacePosition as string],
            styles[faceType],
            isTransitioning ? styles.transitioning : '',
         ].join(' ');
      }, [altFacePosition, faceType, isTransitioning]);

      return (
         <div className={[styles.cubeWrapper, classNameProp].join(' ')} style={styleProp}>
            <div className={parentClassName}>
               <div ref={mainRef} className={styles.front}>
                  {children}
               </div>
               <div ref={altRef} className={styles[altFacePosition as string]}>
                  {altFace}
               </div>
            </div>
         </div>
      );
   }
);
