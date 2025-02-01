import { PORT } from '../config';

describe('config', () => {
   test('ensure port is set', () => {
      expect(PORT).toBe(3001);
   });
});
