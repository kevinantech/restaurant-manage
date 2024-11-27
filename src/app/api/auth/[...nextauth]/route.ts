import { connectDatabase } from "@/backend/common/config/mongo";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password)
          throw new Error("Las credenciales no están disponibles.");
        await connectDatabase();
        const db = new AdminDatabase();
        const userFound = await db.findByUsername(credentials.username);
        console.log("🚀 ~ authorize ~ user:", userFound);
        if (!userFound) throw new Error("El usuario no ha sido encontrado.");

        const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
        const matchPassword = await GeneralUtils.comparePassword(
          credentials.password,
          userFound.password,
          KEY
        );

        if (!matchPassword) throw new Error("Contraseña incorrecta.");

        return {
          id: userFound._id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    error: undefined,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
