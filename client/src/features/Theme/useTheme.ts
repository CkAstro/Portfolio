import { useCallback, useEffect, useState } from 'react';

export interface ThemeContext {
   theme: Theme;
   toggleTheme: () => void;
}

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

const getSystemTheme = (): Theme =>
   window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getStoredTheme = (): Theme | null => localStorage.getItem(STORAGE_KEY) as Theme | null;
const getTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

export const useTheme = (): [Theme, () => void] => {
   const [theme, setTheme] = useState(getTheme());

   useEffect(() => {
      const toAdd = `theme-${theme}`;
      const toRemove = `theme-${theme === 'light' ? 'dark' : 'light'}`;
      if (document.body.classList.contains(toAdd)) return undefined;

      document.documentElement.classList.remove(toRemove);
      document.documentElement.classList.add(toAdd);

      document.documentElement.classList.add('theme-transitioning');
      const timeout = setTimeout(() => {
         document.documentElement.classList.remove('theme-transitioning');
      }, 300);

      return () => {
         clearTimeout(timeout);
      };
   }, [theme]);

   const toggleTheme = useCallback(() => {
      setTheme((prev) => {
         const newTheme = prev === 'dark' ? 'light' : 'dark';
         localStorage.setItem(STORAGE_KEY, newTheme);
         return newTheme;
      });
   }, []);

   return [theme, toggleTheme];
};
