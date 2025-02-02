import path from 'path';
import type { ExpressCallback } from './types';

export const getImageFromUri: ExpressCallback = (request, response) => {
   const { imageUri } = request.params;
   const filePath = path.join(__dirname, '../src/storage/img', imageUri);

   response.sendFile(filePath, (err) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
      if (err) response.status(404).send({ error: 'file not found (404)' });
   });
};
