'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const protectedRoutes = ["/dashboard"];

    if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return <>{children}</>;
};
