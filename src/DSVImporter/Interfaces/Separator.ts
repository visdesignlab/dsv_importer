// @ts-nocheck
export type Separators = 'semicolon' | 'colon' | 'space' | 'tab' | 'comma';

export const SeparatorMap: {[key in Separators]: string} = {
  semicolon: ';',
  colon: ':',
  space: ' ',
  tab: '\t',
  comma: ',',
};

export function getSeparator(val: string): Separators {
  return (Object.entries(SeparatorMap).find((entry: string[]) => {
    if (entry && entry.length > 1) {
      const value = entry[1];
      if (value === val) return true;
    }
    return false;
  }) || ['semicolon', ';'])[0] as Separators;
}
