"use client";

import * as React from "react";
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastInput = Omit<ToastItem, "id">;

const ToastContext = React.createContext<{ toast: (input: ToastInput) => void } | null>(
  null
);

const variantStyles: Record<ToastVariant, string> = {
  success: "border-primary/30 text-primary",
  error: "border-destructive/40 text-destructive",
  info: "border-border text-foreground",
};

const variantIcons = {
  success: CheckmarkCircle01Icon,
  error: Cancel01Icon,
  info: InformationCircleIcon,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const nextId = React.useRef(0);

  const toast = React.useCallback((input: ToastInput) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { ...input, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed top-20 right-4 z-[100] flex w-[min(92vw,22rem)] flex-col gap-2"
      >
        {toasts.map((item) => {
          const Icon = variantIcons[item.variant];
          return (
            <div
              key={item.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-card/95 p-3.5 shadow-xl backdrop-blur-md ${variantStyles[item.variant]}`}
            >
              <HugeiconsIcon icon={Icon} strokeWidth={1.8} className="mt-0.5 size-4 shrink-0" />
              <div className="min-w-0">
                <p className="font-heading text-xs font-semibold text-foreground">{item.title}</p>
                {item.description ? (
                  <p className="mt-0.5 text-[0.68rem] leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
