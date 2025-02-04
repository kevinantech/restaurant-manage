import { ProtectAuthRoutes } from 'app/_common/middlewares/protect-auth-routes';
import { Register } from './Register';

export default async function Page() {
  await ProtectAuthRoutes();
  return <Register />;
}
