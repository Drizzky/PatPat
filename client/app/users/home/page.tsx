'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useSession } from 'next-auth/react';

//TODO ERROR HANDLER JEEEESUUUSSS
const CreateHomePage = () => {
  const [homeName, setHomeName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = session?.user?.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      toast.error('You must be logged in to create a home.');
      router.push('/users/login');
    }
    try {
      const res = await axios.post(
        `${apiUrl}/api/users/home`,
        {
          name: homeName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      toast.success('Home created successfully', {
        id: 'Home',
      });
    } catch (error: unknown) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Pat²</CardTitle>
          <CardDescription className="text-center">Create your home</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Home name">name</Label>
              <Input id="name" type="name" placeholder="Pat² Palace" value={homeName} onChange={(e) => setHomeName(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating your Home...' : 'Create Home'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateHomePage;
