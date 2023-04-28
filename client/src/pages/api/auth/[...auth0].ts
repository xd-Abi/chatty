import {
  handleAuth,
  handleCallback,
  Session,
  getAccessToken,
  LoginOptions,
  handleLogin,
} from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// function afterCallback(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   session: Session,
//   state: any,
// ): Session {
//   console.log(session);
//   console.log(process.env.API_URL);

//   if (session.user) {
//     const user = session.user;

//     const sendRequest = async () => {
//       const { accessToken } = await getAccessToken(req, res);
//       axios
//         .post(
//           `${process.env.API_URL}/api/auth/register`,
//           {
//             name: user.name,
//             email: user.email,
//             avatar: user.picture,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//         )
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     };

//     sendRequest();
//   }

//   return session;
// }

export default handleAuth({});
