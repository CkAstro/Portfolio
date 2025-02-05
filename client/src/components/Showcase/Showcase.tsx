import styles from './Showcase.module.scss';

interface ShowcaseProps {
   header: string | React.ReactElement;
   tech: string | React.ReactElement;
   description: string | React.ReactElement;
   image: React.ReactElement;
   onPointerEnter: () => void;
   onPointerLeave: () => void;
   isActive: boolean;
   onClick: () => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({
   header,
   tech,
   description,
   image,
   onPointerEnter,
   onPointerLeave,
   isActive,
   onClick,
}) => (
   // eslint-disable-next-line jsx-a11y/click-events-have-key-events
   <div
      className={styles.showcase}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
   >
      <div className={styles.showcase__image}>{image}</div>
      <div
         className={[styles.showcase__content, isActive ? styles.active : styles.hidden].join(' ')}
      >
         <h2>{header}</h2>
         <h3>{tech}</h3>
         <p>{description}</p>
      </div>
   </div>
);
