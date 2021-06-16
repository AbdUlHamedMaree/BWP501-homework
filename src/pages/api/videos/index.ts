import { connectDB } from '@/middleware';
import { mockVideo, VideoModel } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>(async (resolve, reject) => {
    if (req.method === 'POST') {
      await new VideoModel(mockVideo()).save();
      res.json('ok');
      resolve();
    } else reject();
  });

export default connectDB(handler);
