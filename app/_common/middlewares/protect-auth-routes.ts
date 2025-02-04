import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { WebRoutes } from '../constants';

export const ProtectAuthRoutes = async () => {
  const session = await getServerSession();
  if (session) return redirect(WebRoutes.DASHBOARD);
};
