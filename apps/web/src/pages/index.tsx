/**
 * @packageDocumentation
 * @module Pages-Home
 */

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user } = useUser();

  return (
    <main>
      <div>
        Welcome {user?.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    </main>
  );
}
