"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "./auth-provider";
import { cn } from "@/lib/utils";

const NAV = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/upload", label: "AI Listing" },
    { href: "/mobile-app", label: "Mobile App" },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { user, signOut } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all",
                scrolled
                    ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
                    : "bg-transparent"
            )}
        >
            <div className="container-page flex h-16 items-center justify-between gap-4">
                <Logo />

                <nav className="hidden items-center gap-1 rounded-full border border-border/50 bg-card/70 px-1.5 py-1.5 shadow-sm backdrop-blur-md md:flex">
                    {NAV.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                                    active
                                        ? "bg-secondary text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-4 w-4 dark:hidden" />
                        <Moon className="hidden h-4 w-4 dark:block" />
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/marketplace">Browse Crafts</Link>
                    </Button>
                    {user ? (
                        <Button variant="gradient" onClick={() => signOut()}>
                            <Sparkles className="h-4 w-4" />
                            Sign Out
                        </Button>
                    ) : (
                        <Button variant="gradient" onClick={() => router.push("/login")}>
                            <Sparkles className="h-4 w-4" />
                            Start Selling
                        </Button>
                    )}
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setOpen((s) => !s)}
                    aria-label="Menu"
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {open && (
                <div className="container-page md:hidden">
                    <div className="mb-4 flex flex-col gap-1 rounded-2xl border bg-card p-3 shadow-lg">
                        {NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "rounded-lg px-4 py-2.5 text-sm font-medium",
                                    pathname === item.href
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-2 flex gap-2 px-1">
                            <Button variant="outline" className="flex-1" asChild>
                                <Link href="/marketplace">Browse</Link>
                            </Button>
                            <Button variant="gradient" className="flex-1" asChild>
                                <Link href="/login">Start Selling</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
