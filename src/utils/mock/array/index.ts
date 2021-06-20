import { random } from 'lodash';

export const array = <TFunc extends () => ReturnType<TFunc>>(
  cb: TFunc,
  length = random(20, 40)
) => Array.from<never, ReturnType<TFunc>>({ length }, () => cb());
