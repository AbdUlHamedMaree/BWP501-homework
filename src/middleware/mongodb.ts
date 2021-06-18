import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
export const connectDB =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    if (typeof process.env.MONGODB_CONNECTION_STRING === 'undefined')
      throw Error('no env variable for MONGODB_CONNECTION_STRING');
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
      });
    } catch (e) {
      console.error('error from connectDB:', e);
    }
    return handler(req, res);
  };
