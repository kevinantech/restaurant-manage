import { API } from "@/frontend/common/constants/api-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { GET_SETUP_DATA } from "../api/setup/route";
import NotFound from "../not-found";
import Setup from "./page.client";

const domain = process.env.NEXTAUTH_URL;

function fetcher(): Promise<ServerResponse<GET_SETUP_DATA>> {
  return fetch(domain + API.SETUP).then((res) => res.json());
}

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
