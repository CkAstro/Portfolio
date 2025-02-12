import { useRef } from 'react';
import { Canvas3d } from '@/components/Canvas/Canvas3d';
import { renderFrame } from './renderFrame';

export const Instabilities: React.FC = () => {
   const drawTrigger = useRef({});

   return <Canvas3d renderFrame={renderFrame} drawTrigger={drawTrigger} />;
};

export default Instabilities;
