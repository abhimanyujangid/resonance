import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in(/.*)",
    "/sign-up(/.*)",
    "/auth(/.*)",
    "/api/auth(/.*)",
]);

const isOrgSelectionRoute = createRouteMatcher([
    "/org-selection(/.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId , orgId } = await auth();

    // When the request is for a public route, we don't need to check for authentication or org selection
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // If the user is not authenticated, redirect to sign-in page
    if (!userId) {
        auth.protect();
        return NextResponse.next();
    }

    // If the user is authenticated but is on the org selection page, allow them to proceed without checking for org selection
    if (isOrgSelectionRoute(req)) {
        return NextResponse.next();
    }

    // For all protected routes, ensure org is selected
    if (userId && !orgId) {
       const orgSelectionUrl = new URL("/org-selection", req.url);
         return NextResponse.redirect(orgSelectionUrl);
    }


    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};