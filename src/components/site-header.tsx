"use client";

import {
  Add01Icon,
  ArrowRight02Icon,
  Calendar03Icon,
  GroupIcon,
  HandHeartIcon,
  LogoutIcon,
  Menu01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-provider";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/components/toast-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Archived Events", href: "/archived-events" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Our impact", href: "/impact" },
  { label: "About", href: "/about" },
];

const privateLinks = [
  { label: "Create Event", href: "/create-event", icon: Add01Icon },
  { label: "Manage Events", href: "/manage-events", icon: Calendar03Icon },
  { label: "Joined Events", href: "/joined-events", icon: GroupIcon },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    toast({ variant: "info", title: "Logged out", description: "See you soon." });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Sobar Haat home" className="shrink-0">
          <Brand />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              render={<Link href={item.href} />}
              className="h-9 px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                  }
                >
                  <Avatar className="size-9">
                    {user.photoURL ? <AvatarImage src={user.photoURL} alt={user.name} /> : null}
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      {initials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{user.name}</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="truncate">
                    <span className="block text-xs font-semibold text-foreground">{user.name}</span>
                    <span className="block truncate text-[0.65rem] font-normal text-muted-foreground">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {privateLinks.map((link) => (
                  <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
                    <HugeiconsIcon icon={link.icon} strokeWidth={1.8} />
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <HugeiconsIcon icon={LogoutIcon} strokeWidth={1.8} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/login" />}
              className="hidden h-9 gap-1.5 px-3 text-xs sm:inline-flex"
            >
              <HugeiconsIcon icon={UserIcon} strokeWidth={1.8} />
              Log in
            </Button>
          )}

          <Button
            size="sm"
            render={<Link href="/events" />}
            className="hidden h-9 gap-1.5 rounded-full px-4 text-xs shadow-md shadow-primary/20 sm:inline-flex"
          >
            <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} />
            Explore events
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} />
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Open navigation menu"
                  className="size-9 rounded-full lg:hidden"
                />
              }
            >
              <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.8} />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,22rem)] gap-0 p-0">
              <SheetHeader className="border-b border-border px-6 pt-6 pb-5">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Brand />
                <SheetDescription>
                  Community service, closer to home.
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      />
                    }
                  >
                    {item.label}
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      strokeWidth={1.6}
                      className="size-4 text-muted-foreground"
                    />
                  </SheetClose>
                ))}

                {user ? (
                  <>
                    <div className="my-2 border-t border-border" />
                    {privateLinks.map((link) => (
                      <SheetClose
                        key={link.href}
                        render={
                          <Link
                            href={link.href}
                            className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                          />
                        }
                      >
                        {link.label}
                        <HugeiconsIcon
                          icon={link.icon}
                          strokeWidth={1.6}
                          className="size-4 text-muted-foreground"
                        />
                      </SheetClose>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      Log out
                      <HugeiconsIcon icon={LogoutIcon} strokeWidth={1.6} className="size-4" />
                    </button>
                  </>
                ) : null}
              </nav>

              <div className="mt-auto grid gap-2 border-t border-border p-6">
                {!user ? (
                  <Button variant="outline" render={<Link href="/login" />} className="h-10 gap-2">
                    <HugeiconsIcon icon={UserIcon} strokeWidth={1.8} />
                    Log in
                  </Button>
                ) : null}
                <Button render={<Link href="/events" />} className="h-10 gap-2 rounded-full">
                  <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} />
                  Explore events
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
