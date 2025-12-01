import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios, { AxiosError } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${apiUrl}/api/users/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { user, message } = res.data;

          if (!res.data || !user) {
            // Pass backend message if available
            throw new Error(message || 'Invalid credentials');
          }

          // Return user object for NextAuth
          return user;
        } catch (error: unknown) {
          let message = 'Login failed';

          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message?: string }>;
            message = axiosError.response?.data?.message || axiosError.message || message;
          }

          // Throw error so NextAuth sets res.error
          throw new Error(message);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // use JWT sessions
  },
  pages: {
    signIn: '/users/login', // your login page
  },
});

export { handler as GET, handler as POST };
