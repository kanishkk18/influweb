// import { clerkMiddleware,  createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher([
//   '/creator(.*)',
//   '/brand(.*)',
// ]);

// export default clerkMiddleware(
//   {
//     publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
//     afterAuth(auth, req) {
//       if (auth.userId && auth.isPublicRoute) {
//         const role = auth.sessionClaims?.publicMetadata?.role;
        
//         if (role === 'creator') {
//           return Response.redirect(new URL('/creator', req.url));
//         }
//         if (role === 'brand') {
//           return Response.redirect(new URL('/brand', req.url));
//         }
//       }
//     }
//   }

// )

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }

import { clerkMiddleware } from '@clerk/nextjs/server'

// This Middleware does not protect any routes by default.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your Middleware
export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
