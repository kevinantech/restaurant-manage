import { compare, genSalt, hash } from 'bcryptjs';

export class GeneralUtils {
  static async encryptPassword(
    password: string,
    pepper: string
  ): Promise<string> {
    const salt = await genSalt(10);
    const pepperedPassword = password + pepper;
    const hashedPassword = await hash(pepperedPassword, salt);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hash: string,
    pepper: string
  ): Promise<boolean> {
    const pepperedPassword = password + pepper;
    const match = await compare(pepperedPassword, hash);
    return match;
  }

  static formatBogotaDateTime(date: Date) {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Bogota',
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  }
}
