import { connectDB } from '@/middleware';
import { mockVideo, VideoModel } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const newVideo = await VideoModel.create(mockVideo());
      res.status(201).json(newVideo);
      resolve();
    } catch (e) {
      res.status(500).json(e);
      reject(e);
    }
  });

export default connectDB(handler);
