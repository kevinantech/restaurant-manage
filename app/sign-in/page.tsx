import { ProtectAuthRoutes } from 'app/_common/middlewares/ProtectAuthRoutes';
import { SignIn } from './SignIn';

export default async function Page() {
  await ProtectAuthRoutes();
  return <SignIn />;
}
