import { useAppContext } from '@/features';
import styles from './Theme.module.scss';

export const ThemeToggle: React.FC = () => {
   const { toggleTheme } = useAppContext();

   return (
      <button className={styles.themeToggle} onClick={toggleTheme}>
         <div />
      </button>
   );
};
