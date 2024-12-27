import { API } from "@/frontend/common/constants/api-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ADMIN_SETUP } from "../api/admin/route";
import NotFound from "../not-found";
import Setup from "./page.client";

const domain = process.env.NEXTAUTH_URL;

/**
 * TODO: Cambiar por un fetch que permita
 * Consulta la configuración establecida.
 * @returns Configuración del sistema
 */
function fetcher(): Promise<ServerResponse<ADMIN_SETUP>> {
  return fetch(domain + API.ADMIN).then((res) => res.json());
}

/**
 * Si existe una sesion activa, no tiene sentido entrar a esta pagina,
 * debido a que existe un administrador vigente.
 * Si no existe registro de una configuracion inicial, esta permitido el acceso.
 * @returns Validez de acceso.
 */
async function validatePass() {
  const session = await getServerSession(authOptions);
  if (session) return false;
  const res = await fetcher();
  if (res && res?.data && res.data.isAdminSetup) return false;
  return true;
}

export default async function Page() {
  const pass = await validatePass();

  return pass ? <Setup /> : <NotFound />;
}
