import { connectDB } from '@/middleware';
import { ArtistModel, VideoModel } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      switch (req.method) {
          case 'GET':
              const { key } = req.query
              if(typeof key === 'object') throw Error('ARRAY!')
          const allV = (await VideoModel.find({}).populate('artists')).filter(e=>e.title.toLowerCase().includes(key));
          const allA = (await ArtistModel.find({}).populate('videos')).filter(e=>e.firstName.toLowerCase().includes(key)||e.lastName.includes(key));
          res.status(200).json({videos:allV,artists:allA});
          resolve();
          break;

        default:
          res.setHeader('Allow', ['GET']);
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
