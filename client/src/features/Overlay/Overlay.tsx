import { useAppContext } from '@/features';
import { CloseButton } from './CloseButton';
import styles from './Overlay.module.scss';

interface OverlayProps {
   onClose: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ onClose }) => {
   const { overlayElement, overlayStatus } = useAppContext();

   return (
      <div className={styles.overlay__container}>
         <div className={styles.overlay__sidebar}>
            <CloseButton status={overlayStatus} onClick={onClose} />
         </div>
         <div className={styles.overlay__content}>{overlayElement}</div>
      </div>
   );
};
