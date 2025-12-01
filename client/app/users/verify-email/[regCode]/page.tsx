'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ValidatePage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { regCode } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!regCode) return;
    const fetchValidateUser = async () => {
      try {
        const res = await axios.put(`${apiUrl}/api/users/verify-email/${regCode}`);

        toast.success(res.data.message || 'Registered successfully! Please log in', {
          id: 'register',
        });
        router.push('/users/login');
      } catch (error: unknown) {
        let message = 'Something went wrong';

        if (axios.isAxiosError(error)) {
          message = error.response?.data?.message || error.message || message;
        }

        toast.warning(message, { id: 'register' });
      }
    };
    fetchValidateUser();
  }, [regCode, apiUrl, router]);

  return (
    <div>
      <h2>User activation page.</h2>
    </div>
  );
};

export default ValidatePage;
