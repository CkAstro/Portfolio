import {
   createContext,
   Suspense,
   useCallback,
   useContext,
   useLayoutEffect,
   useRef,
   useState,
} from 'react';
import { useResizeObserver } from '@/hooks';
import { genSquares, type SquareInfo } from './genSquares';
import { IsotopeChart } from './IsotopeChart';
import { nucleoConfig, type NucleoConfig } from './nucleoConfig';
import { Overlay } from './Overlay';
import { Spotlight } from './Spotlight';
import styles from './NucleoSynth.module.scss';

interface Context {
   squares: SquareInfo[];
   config: NucleoConfig;
}

const NucleoContext = createContext<Context>({
   squares: [],
   config: nucleoConfig['medium'],
});

export const useNucleoContext = (): Context => useContext(NucleoContext);

export const NucleoSynth: React.FC = () => {
   const [squares, setSquares] = useState<SquareInfo[]>([]);
   const [config, setConfig] = useState(nucleoConfig['medium']);

   const resizeRef = useRef({ configSize: 'medium', maxWidth: 0, maxHeight: 0 });
   const onResize = useCallback(({ width, height }: { width: number; height: number }) => {
      const { smallThreshold, largeThreshold } = nucleoConfig;

      const configSize =
         width < smallThreshold ? 'small' : width > largeThreshold ? 'large' : 'medium';
      const newConfig = nucleoConfig[configSize];

      // exit if nothing will change
      if (
         resizeRef.current.configSize === configSize &&
         width >= resizeRef.current.maxWidth &&
         height >= resizeRef.current.maxHeight &&
         width <= resizeRef.current.maxWidth + newConfig.size &&
         height <= resizeRef.current.maxHeight + newConfig.size
      )
         return;

      const { squares: newSquares, maxWidth, maxHeight } = genSquares(newConfig, width, height);
      setSquares(newSquares);
      setConfig(newConfig);
      resizeRef.current = { configSize, maxWidth, maxHeight };
   }, []);

   const [containerRef] = useResizeObserver<HTMLDivElement>(onResize);

   useLayoutEffect(() => {
      const container = containerRef.current;
      if (container === null) return;

      const updatedProperties = {
         '--isotope-gap': `${config.size - 2 * config.border - config.gap}px`,
         '--text-offset': `${config.textOffset}px`,
         '--text-size': config.textSize,
         '--text-small': config.textSmallSize,
      };

      Object.entries(updatedProperties).forEach(([property, value]) => {
         container.style.setProperty(property, value);
      });
   }, [config, containerRef]);

   return (
      <div
         ref={containerRef}
         className={['fillContainer', styles.nucleoSynth].join(' ')}
         style={{ bottom: '2.5rem' }}
      >
         <Suspense fallback={<div />}>
            <NucleoContext.Provider value={{ squares, config }}>
               <Spotlight />
               <Overlay />
               <IsotopeChart />
            </NucleoContext.Provider>
         </Suspense>
      </div>
   );
};
