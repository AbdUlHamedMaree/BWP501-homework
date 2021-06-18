import { withSession } from '@/lib';
import bcrypt from 'bcrypt';

export default withSession(
  async (req, res) =>
    new Promise<void>(async (resolve, reject) => {
      const {
        method,
        body: { username, password },
      } = req;
      try {
        switch (method) {
          case 'POST':
            if (username === 'admin' && password === '123') {
              req.session.set('user', { username });
              await req.session.save();
              res.status(200).json({ username });
            } else
              res
                .status(400)
                .json({ message: 'username or password is invalid' });
            resolve();
            break;

          default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            resolve();
            break;
        }
      } catch (e) {
        res.status(500).json(e);
        reject(e);
      }
    }),
);
