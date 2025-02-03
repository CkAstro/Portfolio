import { memo } from 'react';
import { Isotope } from './Isotope';
import { useNucleoContext } from './NucleoSynth';

export const IsotopeChart: React.FC = memo(() => {
   const { squares, config } = useNucleoContext();

   return (
      <>
         {squares.map((square) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Isotope key={square.id} {...square} {...config} />
         ))}
      </>
   );
});
