import { ScrollableContainer } from '@/components';
import { Navbar, ThemeToggle } from '@/features';
import { config } from '@/utils';
import { AppContextProvider } from './AppContext';
import styles from './App.module.scss';
interface AppProps {
   children: React.ReactElement<{ id: string }>[];
}

export const App: React.FC<AppProps> = ({ children }) => (
   <div className={styles.appContainer}>
      <AppContextProvider>
         <ScrollableContainer
            containerId={config.containerId}
            navbar={(links, visibleSection, scrollTo): React.ReactNode => (
               <Navbar
                  onClick={(id): void => scrollTo(id, 0)}
                  activeIndex={visibleSection?.index ?? -1}
               >
                  {links}
               </Navbar>
            )}
         >
            {children}
         </ScrollableContainer>
         {/* <Overlay id="overlayContainer" headerId={children[0].props.id} />  */}
         <ThemeToggle />
      </AppContextProvider>
   </div>
);
