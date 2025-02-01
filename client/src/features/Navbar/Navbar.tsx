import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/features';
import { capitalize } from '@/utils';
import styles from './Navbar.module.scss';

interface NavbarProps {
   children: string[];
   onClick: (id: string) => void;
   activeIndex: number;
}

export const Navbar: React.FC<NavbarProps> = ({ children, onClick, activeIndex }) => {
   const [isStatic, setIsStatic] = useState(false);
   const { theme } = useAppContext();
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (containerRef.current === null || containerRef.current.parentElement === null)
         return undefined;

      const element = containerRef.current;
      const { parentElement } = containerRef.current;

      const handleScroll = (): void => {
         const { height } = element.getBoundingClientRect();
         const { innerHeight } = window;
         const { scrollTop } = parentElement;

         if (innerHeight - 1 < scrollTop) setIsStatic(true);
         else if (scrollTop < innerHeight - height) setIsStatic(false);
      };

      parentElement.addEventListener('scroll', handleScroll);
      return () => {
         parentElement.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <div
         ref={containerRef}
         className={[
            styles.navbar,
            styles[`theme-${theme}`],
            isStatic ? styles.isStatic : '',
            'noselect',
         ].join(' ')}
      >
         {children.map((section, index) => (
            <button
               key={section}
               onClick={(): void => onClick(section)}
               className={activeIndex === index ? styles.active : ''}
               aria-pressed={activeIndex === index}
            >
               {capitalize(section)}
            </button>
         ))}
         <span
            className={[
               styles.brand,
               activeIndex > 0 ? styles.isVisible : '',
               'noselect',
               'flexCenter',
            ].join(' ')}
         >
            CHRISTOPHER KOLB
         </span>
      </div>
   );
};
