import { Document, Schema, model, models, Model, Types } from 'mongoose';
import { mock } from '@/utils';
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
schema.index({ '$**': 'text' });

export const VideoModel =
  (models?.Video as Model<IVideo>) || model<IVideo>('Video', schema);

export const mockVideo = (): Omit<IVideo, keyof Document> => ({
  title: mock.lorem(3),
  overview: mock.lorem(10),
  description: mock.lorem(50),
  cover: mock.image(mock.or(300, 200), mock.or(300, 200)),
  category: mock.lorem(2),
  country: mock.lorem(1),
  lang: mock.or(...language),
  publishDate: mock.date().toISOString(),
  quality: mock.or(360, 480, 720, 1080) + '',
  type: mock.lorem(1),
  duration: mock.number(1, 3, true) * 60 * 60,
  artists: [],
});
