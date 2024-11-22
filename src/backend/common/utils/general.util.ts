import { genSalt, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export class GeneralUtils {
  public static async encryptPassword(password: string, pepper: string): Promise<string> {
    const salt = await genSalt(10);
    const pepperedPassword = password + pepper;
    const hashedPassword = await hash(pepperedPassword, salt);
    return hashedPassword;
  }

  public static generateToken<P = any>(
    payload: P,
    aud: string,
    secret: string,
    expiresIn: string = "10d"
  ): string {
    return jwt.sign({ ...payload, aud }, secret, { expiresIn });
  }
}
