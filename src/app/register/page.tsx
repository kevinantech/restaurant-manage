import { RegisterPage } from 'app/_components/pages/RegisterPage/RegisterPage';
import { ProtectAuthRoutes } from 'app/_middlewares/ProtectAuthRoutes';

export default async function Page() {
  await ProtectAuthRoutes();
  return <RegisterPage />;
}
