import { createContext, useContext } from 'react';
import { useOverlay, useTheme, type OverlayContext, type ThemeContext } from '@/features';

type CombinedContext = ThemeContext & OverlayContext;
const AppContext = createContext<CombinedContext | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [theme, toggleTheme] = useTheme();
   const { overlayElement, showOverlay, hideOverlay, overlayStatus } = useOverlay();

   return (
      <AppContext.Provider
         value={{
            theme,
            toggleTheme,
            overlayElement,
            showOverlay,
            hideOverlay,
            overlayStatus,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = (): CombinedContext => {
   const context = useContext(AppContext);
   if (context === null)
      throw new Error('useAppContext must be used within <AppContextProvider />');

   return context;
};
