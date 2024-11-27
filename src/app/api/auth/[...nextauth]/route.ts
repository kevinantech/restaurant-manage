/* import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions =  {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { type: "text", placeholder: "jsmith" },
          password: { type: "password", },
        },
        async authorize(credentials, req) {
          console.log(credentials)
  
          const userFound = await db.user.findUnique({
              where: {
                  email: credentials.email
              }
          })
  
          if (!userFound) throw new Error('No user found')
  
          console.log(userFound)
  
          const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
  
          if (!matchPassword) throw new Error('Wrong password')
  
          return {
              id: userFound.id,
              name: userFound.username,
              email: userFound.email,
          }
        },
      }),
    ],
    pages: {
      signIn: "/auth/login",
    }
  }; */
