import { lazy, Suspense } from 'react';

const Component = lazy(() => import('./Instabilities'));

export const Instabilities: React.FC = () => (
   <Suspense fallback={<div />}>
      <Component />
   </Suspense>
);
