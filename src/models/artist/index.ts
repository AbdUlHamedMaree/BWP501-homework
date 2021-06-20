import { Document, Schema, model, models, Model, Types } from 'mongoose';
import { mock } from '@/utils';
import { IVideo } from 'models/video';

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
  firstName: mock.firstname(),
  lastName: mock.lastname(),
  age: mock.number(19, 60),
  avatar: mock.avatar(100),
  about: mock.lorem(20),
  videos: [],
});
