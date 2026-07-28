import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "innoveity-super-secret-jwt-key";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, but allow access to /admin/login and /admin/signup
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/signup') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the JWT token
      await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      
      // Redirect /admin to /admin/home since the dashboard is removed
      if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/home', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
