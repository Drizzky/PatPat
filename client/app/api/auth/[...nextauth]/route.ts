import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

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
        const res = await axios.post(`${apiUrl}/api/users/login`, {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!res.data.user || !res.data.user.token) {
          throw new Error(res.data.message || 'Invalid credentials');
        }

        return { ...res.data.user, token: res.data.user.token };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.token = user.token;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.token = token.token as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
