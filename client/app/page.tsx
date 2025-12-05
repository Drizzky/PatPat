'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from './hooks/useAuth';

const Page = () => {
  const { authUser, authLoading, authLogoutState } = useAuth();

  if (authLoading) return null;

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Pat²</h1>
      <p className="text-gray-600 mb-2">This is a placeholder homepage.</p>
      <p className="text-gray-600 mb-6">Test out API features below.</p>

      <ul className="flex justify-center gap-2 w-full">
        {!authUser && (
          <>
            <li>
              <Link href="/users/register">
                <Button>Sign up!</Button>
              </Link>
            </li>
            <li>
              <Link href="/users/login">
                <Button>Log in</Button>
              </Link>
            </li>
          </>
        )}
        {authUser && (
          <>
            {/* User has no home */}
            {!authUser.idHome && (
              <li>
                <Link href="/users/home/create">
                  <Button>Create Home</Button>
                </Link>
              </li>
            )}

            {/* User has a home */}
            {authUser.idHome && (
              <>
                <li>
                  <Link href={`/home/${authUser.idHome}`}>
                    <Button>Home</Button>
                  </Link>
                </li>
                <li>
                  <Link href={`/home/edit/${authUser.idHome}`}>
                    <Button>Edit Home</Button>
                  </Link>
                </li>
              </>
            )}

            {/* Logout */}
            <li>
              <Button onClick={authLogoutState}>Logout</Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Page;
