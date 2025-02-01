import { capitalize } from '..';

describe('capitalize', () => {
   test('capitalize first letter', () => {
      const input = 'test';

      expect(capitalize(input)).toBe('Test');
   });
   test('do nothing on already-capitalized', () => {
      const input = 'Test';

      expect(capitalize(input)).toBe(input);
   });
   test('do nothing on empty string', () => {
      const input = '';

      expect(capitalize(input)).toBe(input);
   });
});
