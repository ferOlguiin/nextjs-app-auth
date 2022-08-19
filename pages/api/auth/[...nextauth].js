import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
  ],
})