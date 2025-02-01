import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import type { AppRoute } from './routes';
import type { ReactNode } from 'react';

const isNotNested = (routeElement: AppRoute[keyof AppRoute]): routeElement is ReactNode =>
   typeof routeElement !== 'object' || routeElement === null || !('element' in routeElement);

const getRoutesRecursive = (routeObject: AppRoute, ind = 0): ReactNode[] =>
   Object.entries(routeObject).map(([path, route]) => {
      if (route === null) return <Route key={path} path={path} />;
      if (isNotNested(route)) return <Route key={path} path={path} element={route} />;

      // extract container for nested object
      const { element, ...routeObj } = route;
      return (
         <Route key={path} path={path} element={element}>
            {getRoutesRecursive(routeObj, ind + 1)}
         </Route>
      );
   });

export const AppRouter: React.FC = () => (
   <BrowserRouter>
      <Routes>{getRoutesRecursive(routes)}</Routes>
   </BrowserRouter>
);
