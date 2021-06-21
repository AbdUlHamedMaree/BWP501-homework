import { connectDB } from '@/middleware';
import { ArtistModel, IVideo, mockVideo, VideoModel } from '@/models';
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
          const single = await VideoModel.findById(id).populate('artists');
          if (!single) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          }
          res.status(200).json(single);
          resolve();
          break;

        case 'PUT':
          const video = req.body as IVideo;

          const newArtists = video.artists || [];

          const oldVideo = await VideoModel.findOne({ _id: id });

          if (!oldVideo) {
            res.status(400).json({ message: 'not-found' });
            return resolve();
          }

          const oldArtists = oldVideo.artists;

          Object.assign(oldVideo, video);
          const newVideo = await oldVideo.save();

          const added = difference(newArtists, oldArtists);
          const removed = difference(oldArtists, newArtists);
          await ArtistModel.updateMany(
            { _id: added },
            { $addToSet: { videos: newVideo._id } },
          );
          await ArtistModel.updateMany(
            { _id: removed },
            { $pull: { videos: newVideo._id } },
          );

          res.status(201).json(newVideo);
          resolve();
          break;

        case 'DELETE':
          const toDeleted = await VideoModel.findOne({ _id: id });
          if (!toDeleted) {
            res.status(400).json({ message: 'not-found' });
            resolve();
          } else {
            await toDeleted.remove();

            await ArtistModel.updateMany(
              { _id: toDeleted.artists },
              { $pull: { videos: toDeleted._id } },
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
