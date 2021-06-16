import _ from 'lodash';
import { surname, name } from 'react-lorem-ipsum';
import { randomAvatar } from 'utils/random-avatar';
import { shortLorem } from 'utils/short-lorem';
export type Artist = {
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
  about: string;
};

export const mockArtist = (): Artist => ({
  firstName: name(),
  lastName: surname(),
  age: _.random(18, 60),
  avatar: randomAvatar(150),
  about: shortLorem(20),
});
