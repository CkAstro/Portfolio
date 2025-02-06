const PORT = 3001;
const API_ROUTE = 'api';

const getBaseUrl = (host: string): string => {
   if (host.includes('localhost') || host.includes('192'))
      return `http://${host}:${PORT}/${API_ROUTE}`;
   return `/${API_ROUTE}`;
};

export const baseUrl = getBaseUrl(window.location.hostname);
