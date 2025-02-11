import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { authOptions, UserSession } from 'app/api/auth/[...nextauth]/route';
import { isUUID } from 'class-validator';
import { getServerSession } from 'next-auth';

/**
 * Validates the presence of a user,
 * and ensures the user ID is in a valid UUID format. It returns an authentication status
 * along with the user data or an error response.
 */
export const session = async (): Promise<
  | { status: 'authenticated'; data: UserSession }
  | { status: 'unauthenticated'; error: IBaseResponse }
> => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!user || !user.id || !isUUID(user.id)) {
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
