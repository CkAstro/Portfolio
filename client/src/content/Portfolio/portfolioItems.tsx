import { Instabilities } from './Instabilities';

interface PortfolioItem {
   header: string | React.ReactElement;
   tech: string | React.ReactElement;
   description: string | React.ReactElement;
   imageUri: string;
   altText: string;
   imageSizes: { width: number; height: number; maxSize: number }[];
   content?: React.ReactElement;
}

export const portfolioItems: PortfolioItem[] = [
   {
      header: (
         <>
            OpenSCAD <span>Spline</span> Module
         </>
      ),
      tech: 'Node / Algorithms',
      description: '..',
      imageUri: 'scad_showcase',
      altText: 'OpenSCAD Splines',
      imageSizes: [
         { width: 244, height: 200, maxSize: 600 },
         { width: 366, height: 300, maxSize: 800 },
         { width: 488, height: 400, maxSize: -1 },
      ],
   },
   {
      header: (
         <>
            use <span>DataVis</span> to view data anywhere
         </>
      ),
      tech: 'WebGL / GLSL / React / Node',
      description: 'Upload and view volumetric data.',
      imageUri: 'datavis_showcase',
      altText: 'DataVis',
      imageSizes: [
         { width: 244, height: 153, maxSize: 600 },
         { width: 366, height: 229, maxSize: 800 },
         { width: 488, height: 305, maxSize: -1 },
      ],
   },
   {
      header: (
         <>
            Fluid <span>instabilities</span>
         </>
      ),
      tech: 'WebGL / GLSL / React / Express',
      description: 'Watch the evolution of a fluid instability in full 3D.',
      imageUri: 'instability_showcase',
      altText: 'Fluid Instability',
      imageSizes: [
         { width: 244, height: 153, maxSize: 600 },
         { width: 366, height: 229, maxSize: 800 },
         { width: 488, height: 305, maxSize: -1 },
      ],
      content: <Instabilities />,
   },
   {
      header: (
         <>
            Circumstellar <span>data</span>
         </>
      ),
      tech: 'Canvas / REST / Post-Processing',
      description: 'Select from 36 CSM research models and view + export data in detail.',
      imageUri: 'csm_showcase',
      altText: 'Circumstellar Data',
      imageSizes: [
         { width: 244, height: 153, maxSize: 600 },
         { width: 366, height: 229, maxSize: 800 },
         { width: 488, height: 305, maxSize: -1 },
      ],
   },
   {
      header: (
         <>
            Supernova <span>Emission</span>
         </>
      ),
      tech: 'WebGL / GLSL / Post-Processing',
      description:
         'Interact with a supernova simulation and see how emission changes with the view.',
      imageUri: 'emission_showcase',
      altText: 'Supernova Emission',
      imageSizes: [
         { width: 244, height: 153, maxSize: 600 },
         { width: 366, height: 229, maxSize: 800 },
         { width: 488, height: 305, maxSize: -1 },
      ],
   },
   {
      header: (
         <>
            Multiplayer <span>Reversi</span>
         </>
      ),
      tech: 'React / Node / MongoDB / Websocket',
      description:
         'Online multi-player board game. Supports multiple games, observer mode, and replays.',
      imageUri: 'reversi_showcase',
      altText: 'Reversi',
      imageSizes: [
         { width: 244, height: 153, maxSize: 600 },
         { width: 366, height: 229, maxSize: 800 },
         { width: 488, height: 305, maxSize: -1 },
      ],
   },
   {
      header: (
         <>
            Behind the scenes of a <span>neural network</span>
         </>
      ),
      tech: 'React / Canvas / Data Processing / REST',
      description:
         'A hand-writing number-guessing network. Learn in detail how it works, and help train it.',
      imageUri: 'neuralnet_showcase',
      altText: 'NeuralNet',
      imageSizes: [
         { width: 244, height: 240, maxSize: 600 },
         { width: 366, height: 360, maxSize: 800 },
         { width: 488, height: 480, maxSize: -1 },
      ],
   },
];
