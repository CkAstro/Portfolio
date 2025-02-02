interface PortfolioItem {
   header: string | React.ReactElement;
   tech: string | React.ReactElement;
   description: string | React.ReactElement;
   imageUri: string;
   alt: string;
}

export const portfolioItems: PortfolioItem[] = [
   {
      header: (
         <>
            Multiplayer <span>Reversi</span>
         </>
      ),
      tech: 'React / Node / MongoDB / Websocket',
      description:
         'Online multi-player board game. Supports multiple games, observer mode, and replays.',
      imageUri: '/img/reversi_tablet.webp',
      alt: 'Reversi',
   },
   {
      header: (
         <>
            use <span>DataVis</span> to view data anywhere
         </>
      ),
      tech: 'WebGL / GLSL / React / Node',
      description: 'Upload and view volumetric data.',
      imageUri: '/img/datavis_display.webp',
      alt: 'DataVis',
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
      imageUri: '/img/network.webp',
      alt: 'NeuralNet',
   },
   {
      header: (
         <>
            Fluid <span>instabilities</span>
         </>
      ),
      tech: 'WebGL / GLSL / React / Express',
      description: 'Watch the evolution of a fluid instability in full 3D.',
      imageUri: '/img/instability.webp',
      alt: 'Fluid Instability',
   },
   {
      header: (
         <>
            Circumstellar <span>data</span>
         </>
      ),
      tech: 'Canvas / REST / Post-Processing',
      description: 'Select from 36 CSM research models and view + export data in detail.',
      imageUri: '/img/csm.webp',
      alt: 'Circumstellar Data',
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
      imageUri: '/img/emission.webp',
      alt: 'Supernova Emission',
   },
];
