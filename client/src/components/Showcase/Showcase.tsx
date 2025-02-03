import styles from './Showcase.module.scss';

interface ShowcaseProps {
   header: string | React.ReactElement;
   tech: string | React.ReactElement;
   description: string | React.ReactElement;
   image: React.ReactElement;
}

export const Showcase: React.FC<ShowcaseProps> = ({ header, tech, description, image }) => {
   return (
      <div className={styles.showcase}>
         <div className={styles.showcase__image}>{image}</div>
         <div className={styles.showcase__content}>
            <h2>{header}</h2>
            <h3>{tech}</h3>
            <p>{description}</p>
         </div>
      </div>
   );
};
