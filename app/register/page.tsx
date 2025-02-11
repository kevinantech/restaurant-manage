import { ProtectAuthRoutes } from 'app/_common/middlewares/ProtectAuthRoutes';
import { Register } from './Register';

export default async function Page() {
  await ProtectAuthRoutes();
  return <Register />;
}
