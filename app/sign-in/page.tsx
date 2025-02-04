import { ProtectAuthRoutes } from 'app/_common/middlewares/protect-auth-routes';
import { SignIn } from './SignIn';

export default async function Page() {
  await ProtectAuthRoutes();
  return <SignIn />;
}
