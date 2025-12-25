import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/app/lib/supabase/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      const { error } = await supabaseAdmin.from("users").upsert(
        {
          email: user.email,
          name: user.name,
          avatar_url: user.image,
          google_id: account?.providerAccountId,
        },
        {
          onConflict: "email",
        }
      );

      if (error) {
        console.error("Supabase upsert error:", error);
        return false;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
