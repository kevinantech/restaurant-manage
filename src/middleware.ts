import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AppConfigDatabase } from "./backend/modules/shared/appconfig/infrastructure/appconfig.database";
import { FrontendRoutes } from "./frontend/common/constants/frontend-routes-enum";
import { connectDatabase } from "./backend/common/config/mongo";

enum ProtectedRoute {
  ADMIN_SETUP = "/admin-setup",
}

const routeHandlers: Record<
  ProtectedRoute | string,
  (req?: NextRequest) => NextResponse | Promise<NextResponse>
> = {
  [ProtectedRoute.ADMIN_SETUP]: async () => {
    await connectDatabase();
    const config = await new AppConfigDatabase().findOne();
    if (config && config.isAdminSetup) return NextResponse.redirect(FrontendRoutes.DASHBOARD);
    return NextResponse.next();
  },
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const handler = routeHandlers[req.nextUrl.pathname];
  if (handler) return handler();
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ProtectedRoute.ADMIN_SETUP,
};
