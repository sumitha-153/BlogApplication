import "next-auth";
import { Db } from "mongodb";

declare module "next-auth" {
  interface Session {
    user: {
      [x: string]: ReactNode;
      id: string;
      // Add other user properties here
    };
  }

  interface User {
    id: string; // Add id to User interface
    _id: string; // Add _id to User interface
    email: string; // Add email to User interface
    // Add other user properties here
  }
}

declare module "@next-auth/mongodb-adapter" {
  interface MongoDBAdapterOptions {
    db: () => Promise<Db>;
  }
}

declare module "next-auth/providers/credentials" {
  interface CredentialsConfig {
    name: string;
    credentials: Record<string, { label?: string; type?: string; placeholder?: string }>;
    authorize: (credentials: Record<string, string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => Promise<User | null>;
  }

  interface Providers {
    Credentials: (config: CredentialsConfig) => void;
  }
}