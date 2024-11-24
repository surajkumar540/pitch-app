import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string; // Custom property
  }

  interface JWT {
    id: string; // Custom property
  }
}
