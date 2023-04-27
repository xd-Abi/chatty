/**
 * @packageDocumentation
 * @module Pages-App
 */

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

import '@/styles/globals.css';

/**
 * A wrapper component that protects all routes in the application using Auth0.
 * It checks if the user is authenticated and forces them to log in if they're not.
 *
 * @param props - The children of this component.
 */
function Protected(props: { children: React.ReactNode }) {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    /**
     * If the user is not authenticated and the loading process has finished,
     * redirect them to the login page.
     */
    if (isLoading) {
      return;
    }

    if (!user || error) {
      router.push('/api/auth/login');
    }
  }, [isLoading]);

  return <React.Fragment>{user && props.children}</React.Fragment>;
}

/**
 * The main component of the application.
 *
 * @param Component - The component that should be rendered.
 * @param pageProps - The props that are passed to the component.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Protected>
        <Component {...pageProps} />
      </Protected>
    </UserProvider>
  );
}
