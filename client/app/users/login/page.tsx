'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';
import axios from 'axios';

//TODO ERROR HANDLER JEEEESUUUSSS
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error, { id: 'login' });
        return;
      }

      toast.success('Welcome', {
        id: 'login',
        duration: 10000,
      });

      router.push('/');
    } catch (error: unknown) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }

      toast.error(message, { id: 'login' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Pat²</CardTitle>
          <CardDescription className="text-center">Login to share and see more Patsnaps!</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="meow@patpat.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="mt-4 text-center text-sm">
            <span>{"Don't have an account?"}</span>
            <Link href="/users/register" className="underline underline-offset-4 pl-2">
              Sign Up!
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
