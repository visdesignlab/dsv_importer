export type Separators = 'semicolon' | 'colon' | 'space' | 'tab' | 'comma';

export const SeparatorMap: {[key in Separators]: string} = {
  semicolon: ';',
  colon: ':',
  space: ' ',
  tab: '\t',
  comma: ',',
};

export function getSeparator(val: string): Separators {
  return (Object.keys(SeparatorMap)
    .map((k: any) => SeparatorMap[k as Separators])
    .find((value: string) => {
      if (value === val) return true;
      return false;
    }) || ['semicolon', ';'])[0] as Separators;
}
