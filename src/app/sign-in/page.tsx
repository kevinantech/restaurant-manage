import { SignInView } from "@/frontend/views/SignInView";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { FrontendRoutes } from "@/frontend/common/constants";

/**
 * Verifica si el usuario está autenticado.
 * Si lo está, redirige a la página principal (dashboard).
 */
async function redirectIfAuthenticated() {
  const session = await getServerSession(authOptions);
  if (session) redirect(FrontendRoutes.DASHBOARD);
}

export default async function Page() {
  await redirectIfAuthenticated();
  return <SignInView />;
}
