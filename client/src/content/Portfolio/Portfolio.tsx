import { Section, Showcase } from '@/components';
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
      {portfolioItems.map(({ header, tech, description, imageUri, alt }) => (
         <Showcase
            key={alt}
            header={header}
            tech={tech}
            description={description}
            imageUri={imageUri}
            alt={alt}
         />
      ))}
   </Section>
);
