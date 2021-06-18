import { Document, Schema, model, models, Model } from 'mongoose';
import { randomDate, randomIamge, shortLorem } from '@/utils';
import _ from 'lodash';

type Language = 'ar' | 'en';
const language = ['ar', 'en'] as const;

// 1. Create an interface representing a document in MongoDB.
export interface Video extends Document {
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
}
const requiredString = { type: String, required: true } as const;
// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Video>({
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
});

// 3. Create a Model.
export const VideoModel =
  (models?.Video as Model<Video>) || model<Video>('Video', schema);

export const mockVideo = () => ({
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
});
