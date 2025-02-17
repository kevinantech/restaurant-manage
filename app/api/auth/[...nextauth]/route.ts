import { AdminRepository } from '@/admin/infrastructure/admin.repository';
import { WebRoutes } from 'app/routes.config';
import { connectDB } from 'lib/mongoose/connect';
import NextAuth, { AuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GeneralUtils } from 'utils/general.util';

/**
 * https://next-auth.js.org/configuration/providers/credentials
 * https://next-auth.js.org/configuration/callbacks#session-callback
 */

export type UserSession = DefaultSession['user'] & { id: string };

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
        await connectDB();
        const db = new AdminRepository();
        const userFound = await db.getAdminByUsername(credentials.username);
        if (!userFound)
          throw new Error('Parece que no es posible encontrar la cuenta.');

        const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
        const matchPassword = await GeneralUtils.comparePassword(
          credentials.password,
          userFound.password,
          KEY
        );

        if (!matchPassword)
          throw new Error('Usuario o contraseña incorrectos.');

        /**
         * By default NextAuth only take the name, email and image props
         * for the session. If the prop id is setted in the return,
         * the will take place in the token sub prop
         *
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
     * Now we use the id in the session from the entire app (useSession, getServerSession).
     */
    session: ({ session, token }) => {
      if (session.user && token.sub) {
        (session.user as UserSession).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: WebRoutes.SIGN_IN,
    error: undefined,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
