// export const runtime = "edge";

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import User from '@/models/user';
import connectDB from '@/db/connectDb';


const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'user:email',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDB();
        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });

          user.name = newUser.username;
        }
        return true;
      }
    },
   async session({ session }) {
  if (!session?.user?.email) return session;

  await connectDB(); // ✅ Add this to prevent Vercel timeout

  const dbUser = await User.findOne({ email: session.user.email });

  if (dbUser) {
    session.user.name = dbUser.username;
  }

  return session;
}

  }
});

export { handler as GET, handler as POST };
