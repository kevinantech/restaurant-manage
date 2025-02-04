import { AdminDatabase } from '@/admin/infrastructure/admin.database';
import { UserSession } from '@/shared/_common/entity/user-session';
import { WebRoutes } from 'app/_common/constants';
import { connectDB } from 'lib/mongoose/connect';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GeneralUtils } from 'utils/general.util';

/**
 * https://next-auth.js.org/configuration/providers/credentials
 */
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
        const db = new AdminDatabase();
        const userFound = await db.findByUsername(credentials.username);
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

        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          username: userFound.username,
        };
      },
    }),
  ],
  pages: {
    signIn: WebRoutes.SIGN_IN,
    error: undefined,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
