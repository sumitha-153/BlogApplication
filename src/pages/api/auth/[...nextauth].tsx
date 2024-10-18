


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import { connectToDatabase } from "../../../utils/mongodb"; // Adjust the path as necessary
// import { Db } from "mongodb";

// type User = {
//   id: string;
//   _id: string;
//   email: string;
//   // Add other user properties here
// };
// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials) {
//           return null;
//         }

//         const { email, password } = credentials;
//         const db = await connectToDatabase();
//         const usersCollection = db.collection("users");

//         const user = await usersCollection.findOne({
//           email,
//           password,
//         });

//         if (user) {
//           // Map MongoDB document to User object
//           const userObject: User = {
//             id: user._id.toString(), // Convert ObjectId to string
//             _id: user._id.toString(), // Convert ObjectId to string
//             email: user.email,
//             // Add other user properties here
//           };
//           return Promise.resolve(userObject);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   adapter: MongoDBAdapter(connectToDatabase()),
//   session: {
//     strategy: "jwt", // Use JWT strategy
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET, // Use the secret from your environment variables
//   },
//   callbacks: {
//     async jwt({ token, user, account, profile, isNewUser }) {
//       console.log(account, profile, isNewUser);

//       if (user) {
//         token.id = user.id; // Use the id property from the User object
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       console.log("session", session);
//       console.log(user);

//       if (session.user) {
//         session.user.id = token.id as string; // Use the id property from the token
//       }
//       return session;
//     },
//   },
// });




// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import { connectToDatabase } from "../../../utils/mongodb"; // Adjust the path as necessary
// // import { Db } from "mongodb";

// type User = {
//   id: string;
//   _id: string;
//   email: string;
//   // Add other user properties here
// };

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials) {
//           return null;
//         }

//         const { email, password } = credentials;
//         const client = await connectToDatabase(); // Returns a MongoClient object
//         const db = client.db(); // Get the Db instance
//         const usersCollection = db.collection("users");

//         const user = await usersCollection.findOne({
//           email,
//           password,
//         });

//         if (user) {
//           // Map MongoDB document to User object
//           const userObject: User = {
//             id: user._id.toString(), // Convert ObjectId to string
//             _id: user._id.toString(), // Convert ObjectId to string
//             email: user.email,
//             // Add other user properties here
//           };
//           return Promise.resolve(userObject);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   adapter: MongoDBAdapter(connectToDatabase()),
//   session: {
//     strategy: "jwt", // Use JWT strategy
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET, // Use the secret from your environment variables
//   },
//   callbacks: {
//     async jwt({ token, user, account, profile, isNewUser }) {
//       console.log(account+" "+ profile+" "+ isNewUser);

//       if (user) {
//         token.id = user.id; // Use the id property from the User object
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as { id: string }).id = token.id as string; // Use the id property from the token
//       }
//       return session;
//     },
//   },
// });


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
