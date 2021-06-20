import { random } from 'lodash';

export const or = <T>(...args: T[]) => args[random(0, args.length - 1)];
