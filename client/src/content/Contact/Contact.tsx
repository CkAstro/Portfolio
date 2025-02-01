import { Section } from '@/components';
import type { SectionProps } from '../types';
import styles from '../content.module.scss';

const Header: React.FC = () => (
   <h1>
      Contact <span className={styles.weight900}>me</span>
   </h1>
);

export const Contact: React.FC<SectionProps> = ({ id }) => (
   <Section
      id={id}
      header={<Header />}
      className={[styles.contentContainer, styles.contact].join(' ')}
   >
      <div>Contact</div>
   </Section>
);
