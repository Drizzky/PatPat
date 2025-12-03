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
        <li>
          <Link href="/users/register">
            <Button>Sign up!</Button>
          </Link>
        </li>
        <li>
          {session ? (
            <>
              <Button onClick={() => signOut()}>Logout</Button>
              <Link href="/users/home">
                <Button>Create Home</Button>
              </Link>
            </>
          ) : (
            <Link href="/users/login">
              <Button>Log in</Button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Home;
