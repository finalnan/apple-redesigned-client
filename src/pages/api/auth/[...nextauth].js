import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { SanityAdapter } from 'next-auth-sanity';
import { sanityClient } from '../../../sanity';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: SanityAdapter(sanityClient),
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
