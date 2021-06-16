import { shortLorem } from 'utils/short-lorem';

export const randomIamge = (
  w = 300,
  h = 200,
  seed = shortLorem(1).replace(/\W/g, '')
) => `https://picsum.photos/seed/${seed}/${h}/${w}`;
