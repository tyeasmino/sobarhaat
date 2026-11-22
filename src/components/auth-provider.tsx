"use client";

import * as React from "react";

import { authClient } from "@/lib/auth-client";

export type AuthUser = {
  name: string;
  email: string;
  photoURL: string;
};

const AuthContext = React.createContext<{
  user: AuthUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  const user = React.useMemo<AuthUser | null>(() => {
    const sessionUser = session?.user;
    if (!sessionUser) return null;

    return {
      name: sessionUser.name,
      email: sessionUser.email,
      photoURL: sessionUser.image ?? "",
    };
  }, [session]);

  const signOut = React.useCallback(async () => {
    await authClient.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading: isPending, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
