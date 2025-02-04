import { WebRoutes } from 'app/_common/constants';
import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: WebRoutes.SIGN_IN,
  },
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    WebRoutes.DASHBOARD,
  ],
};
