import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers : [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret:  process.env.FACEBOOK_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  session: {
    jwt: true
  },
  pages : {
    signIn: '/auth/signin'
  },
  debug: false
});
