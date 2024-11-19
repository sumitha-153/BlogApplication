
<<<<<<< HEAD


=======
>>>>>>> 6787ee5820f8428e6444f47051e8496dc379c522
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "../../../utils/mongodb";

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
        console.log(email+" "+password);
        
        const client = await connectToDatabase(); // MongoClient instance
        console.log(client);
        
        const db = client.db("BlogApplication"); // Specify the DB name
        console.log(db);
        const usersCollection = db.collection("users");

        // Find the user by email
        const user = await usersCollection.findOne({ email,password });

        if (!user) {
          console.error("No user found with the provided email");
          return null;
        }

        // Return user object on successful authentication
        return {
          id: user._id.toString(), // Convert MongoDB ObjectId to string
          _id: user._id.toString(), // Convert MongoDB ObjectId to string
          email: user.email,
          // Include other fields if necessary
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(
    connectToDatabase().then((client) => client) // Pass MongoClient instance directly
  ),
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Use the secret from environment variables
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to JWT token
      }
      return token;
    },
    async session({ session, token }) {
            if (session.user) {
              (session.user as { id: string }).id = token.id as string; // Use the id property from the token
            }
            return session;
          },
  },
});
