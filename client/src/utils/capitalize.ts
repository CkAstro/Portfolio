/**Capitalize the first letter of a string
 * @example capitalize('my string') === 'My string'
 * @example capitalize('pascalCase') === 'PascalCase'
 */
export const capitalize = (str: string): string =>
   str === '' ? '' : [str[0].toUpperCase(), str.slice(1)].join('');
