import { connectDB } from '@/middleware';
import { mockVideo, VideoModel } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const {
        query: { id },
      } = req;

      switch (req.method) {
        case 'GET':
          const single = await VideoModel.findById(id);
          if (!single) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          }
          res.status(200).json(single);
          resolve();
          break;

        case 'PUT':
          const updated = await VideoModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!updated) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          }
          res.status(201).json(updated);
          resolve();
          break;

        case 'DELETE':
          const deleted = await VideoModel.deleteOne({ _id: id });
          if (!deleted) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          }
          res.status(203).json(deleted);
          resolve();
          break;

        default:
          res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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
