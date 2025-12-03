import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      idHome: string;
      token: string; // our backend token
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    idHome: string;
    token: string;
  }
}
