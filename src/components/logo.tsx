import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
    className,
    showText = true,
}: {
    className?: string;
    showText?: boolean;
}) {
    return (
        <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-500 via-terracotta-400 to-teal-500 shadow-md shadow-terracotta-500/30 transition-transform group-hover:scale-105">
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 2c2 4 6 6 10 6-4 0-8 2-10 6-2-4-6-6-10-6 4 0 8-2 10-6Z" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white" />
            </span>
            {showText && (
                <span className="font-display text-xl font-bold tracking-tight">
                    KalaSetu <span className="text-primary">AI</span>
                </span>
            )}
        </Link>
    );
}
