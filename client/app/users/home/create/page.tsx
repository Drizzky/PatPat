'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '@/app/hooks/useAuth';

const CreateHomePage = () => {
  const [homeName, setHomeName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { authUser, authToken } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!authUser || !authToken) {
      setTimeout(() => {
        toast.error('You must be logged in to create a home.');
        router.push('/users/login');
      }, 100);
    }
  }, [authUser, authToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${apiUrl}/api/users/home`,
        { name: homeName },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success(res.data.message || 'Home created!', { id: 'Home' });

      router.push(`/home/${authUser.idHome}`);
    } catch (error: unknown) {
      let message = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }
      toast.error(message, { id: 'Home' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Pat²</CardTitle>
          <CardDescription className="text-center">Every pet needs a home, add yours!</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="homeName">Name</Label>
              <Input id="homeName" type="text" placeholder="Pat² Palace" value={homeName} onChange={(e) => setHomeName(e.target.value)} required />
            </div>

            <div className="grid w-full max-w-64 items-center gap-1.5">
              <Label htmlFor="picture">Banner</Label>
              <Input id="picture" type="file" />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Creating your Home...' : 'Create Home'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateHomePage;
