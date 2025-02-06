import { request } from './fetch';
export { baseUrl } from './common';

export const getImage = (imageUri: string): Promise<string> =>
   request.get<{ response: string }>(imageUri);
