import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import { randomBytes, randomUUID } from "crypto"
import { authSendRequest } from "@/lib/authSendRequest"
import { getFirestore } from "firebase-admin/firestore"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_API_KEY,
      from: process.env.AUTH_RESEND_EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { from },
      }) {
        authSendRequest({ email, url, from })
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      const db = getFirestore()
      try {
        const userRef = db.collection("users").doc(token.sub!)
        const userDoc = await userRef.get()

        if (userDoc.exists) {
          session.user = {
            ...session.user,
            ...userDoc.data(),
          }
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error)
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      const db = getFirestore()

      const userRef = db.collection("users").doc(user.id!)

      await userRef.set({
        email: user.email,
        name: user.name || null,
        username: user.email?.substring(0, user.email?.indexOf("@")),
        role: "user",
      })
    },
  },
  pages: {
    signIn: "/auth",
  },
})
