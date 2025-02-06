import { baseUrl } from './common';

const apiPath = (url: string): string => [baseUrl, url].join(url.startsWith('/') ? '' : '/');

const getRequest = <T extends { response: unknown }>(url: string): Promise<T['response']> =>
   fetch(apiPath(url), { method: 'GET', headers: { Accept: 'application/json' } }).then(
      (response) => {
         if (!response.ok) return response.json().then(({ error }) => new Error(error as string));
         return response.json() as T['response'];
      }
   );

export const request = {
   get: getRequest,
};
