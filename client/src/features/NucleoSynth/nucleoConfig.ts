export interface NucleoConfig {
   size: number;
   gap: number;
   border: number;
   leftOffset: number;
   bottomOffset: number;
   textOffset: number;
   textSize: string;
   textSmallSize: string;
}

const smallConfig: NucleoConfig = {
   size: 56,
   gap: 4,
   border: 2,
   leftOffset: 4,
   bottomOffset: 4,
   textOffset: 2,
   textSize: '1.2rem',
   textSmallSize: '0.6rem',
};

const mediumConfig: NucleoConfig = {
   size: 66,
   gap: 6,
   border: 2,
   leftOffset: 8,
   bottomOffset: 8,
   textOffset: 3,
   textSize: '1.5rem',
   textSmallSize: '0.75rem',
};

const largeConfig: NucleoConfig = {
   size: 80,
   gap: 5,
   border: 4,
   leftOffset: 12,
   bottomOffset: 12,
   textOffset: 3,
   textSize: '1.6rem',
   textSmallSize: '1rem',
};

export const nucleoConfig = {
   small: smallConfig,
   medium: mediumConfig,
   large: largeConfig,
   smallThreshold: 480,
   largeThreshold: 1350,
};
