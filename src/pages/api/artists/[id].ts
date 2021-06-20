import { connectDB } from '@/middleware';
import { ArtistModel, IArtist, VideoModel } from '@/models';
import { difference } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const {
        query: { id },
      } = req;

      switch (req.method) {
        case 'GET':
          const single = await ArtistModel.findById(id);
          if (!single) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          }
          res.status(200).json(single);
          resolve();
          break;

        case 'PUT':
          const artist = req.body as IArtist;

          const newVideos = artist.videos || [];

          const oldArtist = await ArtistModel.findOne({ _id: id });

          if (!oldArtist) {
            res.status(400).json({ message: 'not-found' });
            return resolve();
          }

          const oldVideos = oldArtist.videos;

          Object.assign(oldArtist, artist);
          const newArtist = await oldArtist.save();

          const added = difference(newVideos, oldVideos);
          const removed = difference(oldVideos, newVideos);
          await VideoModel.updateMany(
            { _id: added },
            { $addToSet: { artists: newArtist._id } },
          );
          await VideoModel.updateMany(
            { _id: removed },
            { $pull: { artists: newArtist._id } },
          );

          res.status(201).json(newArtist);
          resolve();
          break;

        case 'DELETE':
          const toDeleted = await ArtistModel.findOne({ _id: id });

          if (!toDeleted) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          } else {
            await toDeleted.remove();

            await VideoModel.updateMany(
              { _id: toDeleted.videos },
              { $pull: { artists: toDeleted._id } },
            );

            res.status(203).json(toDeleted);
            resolve();
          }
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
