import type { SquareInfo } from './genSquares';
import type { NucleoConfig } from './nucleoConfig';
import styles from './NucleoSynth.module.scss';

type ConfigOptions = 'gap' | 'border';
type IsotopeProps = Omit<SquareInfo, 'id'> & Pick<NucleoConfig, ConfigOptions>;

export const Isotope: React.FC<IsotopeProps> = ({
   element,
   protons,
   neutrons,
   isStable,
   x,
   y,
   gap,
   border,
}) => (
   <div
      className={[styles.isotope, isStable ? styles.isStable : '', 'flexCenter', 'noselect'].join(
         ' '
      )}
      style={{
         top: `${y + 0.5 * gap + border}px`,
         left: `${x + 0.5 * gap + border}px`,
      }}
   >
      <span className={[styles.isotope__weight, 'flexCenter'].join(' ')}>{protons + neutrons}</span>
      <span className={styles.isotope__protons}>{protons}</span>
      <span className={styles.isotope__element}>{element}</span>
   </div>
);
