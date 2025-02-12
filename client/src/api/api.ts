import { baseUrl } from './common';
import { request } from './fetch';

export { baseUrl };
export const getUrl = (path: string): string => [baseUrl, path].join('/');

export const getImage = (imageUri: string): Promise<string> =>
   request.get<{ response: string }>(imageUri);
