import { useState } from 'react';
import { Section, Showcase, LazyImage } from '@/components';
import { portfolioItems } from './portfolioItems';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

export const Portfolio: React.FC<SectionProps> = ({ id }) => {
   const [activeShowcase, setActiveShowcase] = useState(-1);

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
         <div className={styles.imageContainer}>
            {portfolioItems.map(
               ({ header, tech, description, imageUri, altText, imageSizes }, index) => (
                  <Showcase
                     key={altText}
                     onPointerEnter={(): void => setActiveShowcase(index)}
                     onPointerLeave={(): void => setActiveShowcase(-1)}
                     isActive={activeShowcase === index}
                     header={header}
                     tech={tech}
                     description={description}
                     image={<LazyImage sizes={imageSizes} altText={altText} imageUri={imageUri} />}
                  />
               )
            )}
         </div>
      </Section>
   );
};
