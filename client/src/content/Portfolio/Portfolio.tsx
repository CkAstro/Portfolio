import { useRef, useState } from 'react';
import {
   Section,
   Showcase,
   LazyImage,
   AnimatedCube,
   type AnimatedCubeControls,
} from '@/components';
import { Overlay, useAppContext } from '@/features';
import { portfolioItems } from './portfolioItems';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

export const Portfolio: React.FC<SectionProps> = ({ id }) => {
   const { showOverlay, hideOverlay } = useAppContext();
   const [activeShowcase, setActiveShowcase] = useState(-1);

   const cubeControls = useRef<AnimatedCubeControls>(null);

   const handleClick = (element: React.ReactElement): void => {
      showOverlay(element);
      cubeControls.current?.toAltFace();
   };

   return (
      <Section
         id={id}
         header={
            <h1>
               Some <span style={{ fontWeight: 900 }}>Projects</span>
            </h1>
         }
         className={[styles.contentContainer, styles.portfolio].join(' ')}
      >
         <AnimatedCube
            ref={cubeControls}
            altFace={
               <Overlay
                  onClose={(): void => {
                     cubeControls.current?.toMainFace();
                     hideOverlay();
                  }}
               />
            }
            altFacePosition="right"
            style={{ margin: '0 auto' }}
         >
            <div className={styles.imageContainer}>
               {portfolioItems
                  .slice(0, 4)
                  .map(
                     (
                        { header, tech, description, imageUri, altText, imageSizes, content },
                        index
                     ) => (
                        <Showcase
                           onClick={(): void => handleClick(content ?? <h1>{header}</h1>)}
                           key={altText}
                           onPointerEnter={(): void => setActiveShowcase(index)}
                           onPointerLeave={(): void => setActiveShowcase(-1)}
                           isActive={activeShowcase === index}
                           header={header}
                           tech={tech}
                           description={description}
                           image={
                              <LazyImage sizes={imageSizes} altText={altText} imageUri={imageUri} />
                           }
                        />
                     )
                  )}
            </div>
         </AnimatedCube>
      </Section>
   );
};
