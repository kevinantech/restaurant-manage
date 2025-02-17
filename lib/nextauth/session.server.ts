import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { authOptions, UserSession } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const session = async (): Promise<
  | { status: 'authenticated'; data: UserSession }
  | { status: 'unauthenticated'; error: IBaseResponse }
> => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!user || !user.id) {
    return {
      status: 'unauthenticated',
      error: {
        ...ResponseCode.UNAUTHORIZED,
        message: 'Authentication failed',
      },
    };
  }

  return { status: 'authenticated', data: user };
};
