import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "../../../utils/mongodb"; // Adjust the path as necessary
import { Db } from "mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email,
          password,
        });

        if (user) {
          // Map MongoDB document to User object
          const userObject: User = {
            id: user._id.toString(), 
            _id: user._id.toString(), // Convert ObjectId to string
            email: user.email,
            // Add other user properties here
          };
          return Promise.resolve(userObject);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter({
    db: async () => {
      const db = await connectToDatabase();
      return db as Db; // Explicitly type the db property
    },
  }),
  session: {
    strategy: "jwt", // Use JWT strategy
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Use the secret from your environment variables
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(account, profile, isNewUser);

      if (user) {
        token.id = user.id; // Use the id property from the User object
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session", session);
      console.log(user);

      session.user.id = token.id; // Use the id property from the token
      return session;
    },
  },
});