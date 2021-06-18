import { withSession } from '@/lib';

export default withSession(
  async (req, res) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        req.session.destroy();
        res.status(200).json({ message: 'loged out successfully' });
        resolve();
      } catch (e) {
        res.status(500).json(e);
        reject(e);
      }
    }),
);
