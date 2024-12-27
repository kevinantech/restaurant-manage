/* import { NextRequest, NextResponse } from "next/server";
import { GET_SETUP_DATA } from "./app/api/setup/route";
import { API } from "@/frontend/common/constants/api-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { FrontendRoutes } from "./frontend/common/constants/frontend-routes-enum"; */
export { default } from "next-auth/middleware";

/* enum ProtectedRoute {
  SETUP = "/setup",
}

const routeHandlers: Record<
  ProtectedRoute | string,
  (req: NextRequest) => NextResponse | Promise<NextResponse>
> = {
  [ProtectedRoute.SETUP]: async (req) => {
    // TODO: Revisar si esta logeado.

    const fetcher = () => fetch(`http://${req.nextUrl.host}${API.SETUP}`);
    const res: ServerResponse<GET_SETUP_DATA> = await fetcher().then(
      async (res) => await res.json()
    );
    if (res && res?.data && res.data.isAdminSetup)
      return NextResponse.redirect(
        `http://${req.nextUrl.host}${FrontendRoutes.DASHBOARD}`
      );
    return NextResponse.next();
  },
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const handler = routeHandlers[req.nextUrl.pathname];
  if (handler) return handler(req);
  return NextResponse.next();
} */

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app/:path*"],
};
