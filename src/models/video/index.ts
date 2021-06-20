import { Document, Schema, model, models, Model, Types } from 'mongoose';
import { randomDate, randomIamge, shortLorem } from '@/utils';
import _ from 'lodash';
import { IArtist } from 'models/artist';

type Language = 'ar' | 'en';
const language = ['ar', 'en'] as const;

export interface IVideo extends Document {
  title: string;
  description: string;
  overview: string;
  cover: string;
  publishDate: string;
  lang: Language;
  country: string;
  type: string;
  category: string;
  quality: string;
  duration: number;
  artists: (string | IArtist)[];
}

const requiredString = { type: String, required: true } as const;
const schema = new Schema<IVideo>({
  title: requiredString,
  description: requiredString,
  overview: requiredString,
  cover: requiredString,
  publishDate: requiredString,
  lang: requiredString,
  country: requiredString,
  type: requiredString,
  category: requiredString,
  quality: requiredString,
  duration: { type: Number, required: true },
  artists: [{ type: Types.ObjectId, ref: 'Artist' }],
});

export const VideoModel =
  (models?.Video as Model<IVideo>) || model<IVideo>('Video', schema);

export const mockVideo = (): Omit<IVideo, keyof Document> => ({
  title: shortLorem(3),
  overview: shortLorem(6),
  description: shortLorem(100),
  cover: randomIamge(),
  category: shortLorem(2),
  country: shortLorem(1),
  lang: language[_.random(0, 1)],
  publishDate: randomDate().toISOString(),
  quality: _.random(1000).toString(),
  type: shortLorem(1),
  duration: _.random(1, 3, true) * 60 * 60,
  artists: [],
});
