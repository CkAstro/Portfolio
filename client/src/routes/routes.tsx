import { content } from '@/content';
import { App } from '@/features';
import type { ReactNode } from 'react';

export interface AppRoute {
   element?: ReactNode;
   [path: string]: ReactNode | AppRoute | null;
}

export const routes: AppRoute = {
   '/': {
      element: <App>{content}</App>,
   },
};
