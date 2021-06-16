import _ from 'lodash';

export const randomAvatar = (s = 200) =>
  `https://i.pravatar.cc/${s}?u=${_.random(100000)}`;
