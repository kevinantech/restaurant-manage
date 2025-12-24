import { LoginPage } from 'app/_components/pages/LoginPage/LoginPage';
import { ProtectAuthRoutes } from 'app/_middlewares/ProtectAuthRoutes';

export default async function Page() {
  await ProtectAuthRoutes();
  return <LoginPage />;
}
