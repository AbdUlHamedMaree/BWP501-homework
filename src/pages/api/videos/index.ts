import { connectDB } from '@/middleware';
import { mockVideo, VideoModel } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      switch (req.method) {
        case 'GET':
          const all = await VideoModel.find({});
          res.status(200).json(all);
          resolve();
          break;

        case 'POST':
          const newVideo = await VideoModel.create(mockVideo());
          res.status(201).json(newVideo);
          resolve();
          break;

        default:
          res.setHeader('Allow', ['GET', 'POST']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
          resolve();
          break;
      }
    } catch (e) {
      res.status(500).json(e);
      reject(e);
    }
  });

export default connectDB(handler);
