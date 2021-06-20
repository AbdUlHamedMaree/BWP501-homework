import _ from 'lodash';
import { surname, name } from 'react-lorem-ipsum';

import { Document, Schema, model, models, Model, Types } from 'mongoose';
import { randomAvatar, shortLorem } from '@/utils';
import { IVideo, mockVideo } from 'models/video';

export interface IArtist extends Document {
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
  about: string;
  videos: (string | IVideo)[];
}

const requiredString = { type: String, required: true } as const;
const schema = new Schema<IArtist>({
  firstName: requiredString,
  lastName: requiredString,
  age: requiredString,
  avatar: requiredString,
  about: requiredString,
  videos: [{ type: Types.ObjectId, ref: 'Video' }],
});

export const ArtistModel =
  (models?.Artist as Model<IArtist>) || model<IArtist>('Artist', schema);

export const mockArtist = (): Omit<IArtist, keyof Document> => ({
  firstName: name(),
  lastName: surname(),
  age: _.random(18, 60),
  avatar: randomAvatar(150),
  about: shortLorem(20),
  videos: [],
});
