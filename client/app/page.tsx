'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Pat²</h1>
      <p className="text-gray-600 mb-2">This is a placeholder homepage.</p>
      <p className="text-gray-600 mb-6">Test out API shit down below.</p>

      <ul className="flex justify-center gap-2 w-full">
        {!session && (
          <li>
            <Link href="/users/register">
              <Button>Sign up!</Button>
            </Link>
          </li>
        )}
        {!session && (
          <li>
            <Link href="/users/login">
              <Button>Log in</Button>
            </Link>
          </li>
        )}

        {/* Logged in */}
        {session && (
          <>
            {!session.user.idHome && (
              <li>
                <Link href="/users/home/create">
                  <Button>Create Home</Button>
                </Link>
              </li>
            )}
            {session.user.idHome && (
              <>
                <li>
                  <Link href={`/home/${session.user.idHome}`}>
                    <Button>Home</Button>
                  </Link>
                </li>
                <li>
                  <Link href={`/home/edit/${session.user.idHome}`}>
                    <Button>Edit Home</Button>
                  </Link>
                </li>
              </>
            )}

            {/* Logout */}
            <li>
              <Button onClick={() => signOut()}>Logout</Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Home;
