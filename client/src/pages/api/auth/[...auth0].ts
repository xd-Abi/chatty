import { NextApiRequest, NextApiResponse } from 'next';
import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { RequestHandler } from '@/lib/requesthandler';

function afterCallback(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  state: any,
): Session {
  if (session.user) {
    const user = session.user;
    const requestHandler = new RequestHandler(session?.accessToken ?? '');
    requestHandler.post(`api/auth/register`, {
      name: user.name,
      email: user.email,
      avatar: user.picture,
    });
  }

  return session;
}

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(500).end();
    }
  },
});
