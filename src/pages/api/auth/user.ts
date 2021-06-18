import { withSession } from '@/lib';

export default withSession(
  async (req, res) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        const user = req.session.get('user');
        if (user) {
          res.status(200).json(user);
        } else res.status(401).json({ message: 'not auth' });
        resolve();
      } catch (e) {
        res.status(500).json(e);
        reject(e);
      }
    }),
);
