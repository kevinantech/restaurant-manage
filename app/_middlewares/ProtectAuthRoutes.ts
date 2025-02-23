import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { WebRoutes } from 'app/routes.config';

export const ProtectAuthRoutes = async () => {
  const session = await getServerSession();
  if (session) return redirect(WebRoutes.DASHBOARD);
};
