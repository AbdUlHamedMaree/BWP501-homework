import { random } from 'lodash';

export const image = (
  h = 300,
  w = 200,
  s: number | string = random(Math.pow(10, 10))
) => `https://picsum.photos/seed/${s}/${h}/${w}`;
