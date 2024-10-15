import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
    username?: string
  }

  interface Session {
    user: User
  }
}
