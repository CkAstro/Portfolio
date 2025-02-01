import { Section } from '@/components';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

const Header: React.FC = () => (
   <h1>
      <span className="w900">Astrophysics</span> Stuff
   </h1>
);

export const Research: React.FC<SectionProps> = ({ id }) => (
   <Section
      id={id}
      header={<Header />}
      className={[styles.contentContainer, styles.research].join(' ')}
   >
      <div>Research</div>
   </Section>
);
