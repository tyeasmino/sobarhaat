"use client";

import * as React from "react";

const STORAGE_KEY = "sobar-haat-user";
const AUTH_EVENT = "sobar-haat-auth";

export type AuthUser = {
  name: string;
  email: string;
  photoURL: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerSnapshot() {
  return "";
}

const AuthContext = React.createContext<{
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const raw = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const user = React.useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }, [raw]);

  const signIn = React.useCallback((nextUser: AuthUser) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const signOut = React.useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
