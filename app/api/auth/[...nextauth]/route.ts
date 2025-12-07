import { AdminRepository } from '@/admin/infrastructure/admin.repository';
import { WebRoutes } from 'app/_common/routes-enum';
import { GeneralUtils } from 'lib/general.util';
import { dbConnect } from 'lib/mongoose/connect';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * https://next-auth.js.org/configuration/providers/credentials
 * https://next-auth.js.org/configuration/callbacks#session-callback
 */

export type UserSession = {
  id: string;
  name: string;
  email: string;
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req): Promise<UserSession | null> {
        if (!credentials || !credentials.username || !credentials.password)
          throw new Error('Las credenciales no han sido proporcionadas.');
        await dbConnect();
        const db = new AdminRepository();
        const userFound = await db.getAdminByUsername(credentials.username);
        if (!userFound) throw new Error('Usuario o contraseña incorrectos.');

        const PASS_ENCRYPTION_KEY = <string>process.env.PASS_ENCRIPTION_KEY;
        const matchPassword = await GeneralUtils.comparePassword(
          credentials.password,
          userFound.password,
          PASS_ENCRYPTION_KEY
        );

        if (!matchPassword) throw new Error('Usuario o contraseña incorrectos.');

        /**
         * By default NextAuth only take the name, email and image props
         * for the session. If the prop id is setted in the return,
         * the will take place in the token sub prop
         * @watch session callback.
         */
        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    /**
     * We know that the token sub prop contains the id
     * setted in the authorize function. Then we set the data in the user session.
     * Now the id will be available in the session object (useSession, getServerSession).
     *
     * Example of token payload:
     * {
     *   "sub": "507f1f77bcf86cd799439011",  // User ID from authorize function
     *   "name": "John Doe",
     *   "email": "john.doe@example.com",
     * }
     *
     */
    session: ({ session, token }) => {
      if (session.user && token.sub) {
        (session.user as UserSession).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: WebRoutes.LOGIN,
    error: undefined,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
