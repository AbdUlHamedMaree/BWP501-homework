import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';

export const withSession = <T>(
  handler: (
    req: NextApiRequest & { session: Session },
    res: NextApiResponse<T>,
  ) => Promise<void>,
) => {
  return withIronSession(handler, {
    password:
      process.env.SECRET_COOKIE_PASSWORD ?? 'bwp501_homework_abdulhamed_109379',
    cookieName: 'auth',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      httpOnly: true,
    },
  });
};
