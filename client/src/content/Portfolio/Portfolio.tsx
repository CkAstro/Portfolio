import { Section } from '@/components';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

const Header: React.FC = () => (
   <h1>
      Some <span style={{ fontWeight: 900 }}>Projects</span>
   </h1>
);

export const Portfolio: React.FC<SectionProps> = ({ id }) => (
   <Section
      id={id}
      header={<Header />}
      className={[styles.contentContainer, styles.portfolio].join(' ')}
   >
      <div>Portfolio</div>
   </Section>
);
