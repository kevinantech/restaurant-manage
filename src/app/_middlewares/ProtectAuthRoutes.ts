import { WebRoutes } from 'app/_common/routes-enum';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

/**
 * Avoid access to the auth routes if the user is authenticated.
 */
export const ProtectAuthRoutes = async () => {
  const session = await getServerSession();
  if (session) return redirect(WebRoutes.HOME);
};
