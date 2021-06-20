import { random } from 'lodash';

export const avatar = (s = 150, u = random(Math.pow(10, 10))) =>
  `https://i.pravatar.cc/${s}?u=${u}`;
