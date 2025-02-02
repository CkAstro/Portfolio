import { api } from '@/api';
import styles from './Showcase.module.scss';

interface ShowcaseProps {
   header: string | React.ReactElement;
   tech: string | React.ReactElement;
   description: string | React.ReactElement;
   imageUri: string;
   alt: string;
}

export const Showcase: React.FC<ShowcaseProps> = ({ header, tech, description, imageUri, alt }) => {
   const imageUrl = [api.baseUrl, imageUri].join('/');

   return (
      <div className={styles.showcase}>
         <div className={styles.showcase__image}>
            <img src={imageUrl} alt={alt} />
         </div>
         <div className={styles.showcase__content}>
            <h2>{header}</h2>
            <h3>{tech}</h3>
            <p>{description}</p>
         </div>
      </div>
   );
};
