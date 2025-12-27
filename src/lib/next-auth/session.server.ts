import { authOptions, UserSession } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const session = async (): Promise<UserSession | undefined> => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession | undefined;
  return user;
};
