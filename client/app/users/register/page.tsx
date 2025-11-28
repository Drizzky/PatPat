'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/api/users/register`, {
        name,
        email,
        password,
      });

      toast(res.data.message || 'Registered successfully!', {
        id: 'register',
        duration: 10000,
      });
    } catch (error: unknown) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }

      toast.error(message, { id: 'register' });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl">Pat²</CardTitle>
          <CardDescription className="text-center">Sign up to share and see more Patsnaps!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="m-10">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input id="email" type="email" placeholder="meow@patpat.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">
                Sign up!
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="mt-4 text-center text-sm">
            <span>Already have an account?</span>
            <Link href="/users/register" className="underline underline-offset-4 pl-2">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
