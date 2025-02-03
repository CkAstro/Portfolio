import { Section, Showcase, LazyImage } from '@/components';
import { portfolioItems } from './portfolioItems';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

export const Portfolio: React.FC<SectionProps> = ({ id }) => (
   <Section
      id={id}
      header={
         <h1>
            Some <span style={{ fontWeight: 900 }}>Projects</span>
         </h1>
      }
      className={[styles.contentContainer, styles.portfolio].join(' ')}
   >
      {portfolioItems.map(({ header, tech, description, imageUri, altText, imageSizes }) => (
         <Showcase
            key={altText}
            header={header}
            tech={tech}
            description={description}
            image={<LazyImage sizes={imageSizes} altText={altText} imageUri={imageUri} />}
         />
      ))}
   </Section>
);
