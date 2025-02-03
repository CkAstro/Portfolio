import { Section } from '@/components';
import { NucleoSynth } from '@/features';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

const Header: React.FC = () => (
   <h1>
      <span style={{ fontWeight: 900 }}>Christopher Kolb</span>
   </h1>
);

export const Home: React.FC<SectionProps> = ({ id }) => (
   <Section
      id={id}
      header={<Header />}
      className={[styles.contentContainer, styles.home].join(' ')}
   >
      <NucleoSynth />
   </Section>
);
