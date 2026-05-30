"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CraftIllustrationProps {
    title: string;
    category: string;
    className?: string;
    // Decorative emoji + gradient palette per category
}

const CATEGORY_THEMES: Record<
    string,
    { from: string; via: string; to: string; emoji: string; pattern?: string }
> = {
    Pottery: {
        from: "#A84D14",
        via: "#DD7E3A",
        to: "#FAE5D2",
        emoji: "🏺",
    },
    Textiles: {
        from: "#7E3A10",
        via: "#C9621D",
        to: "#F3C39A",
        emoji: "🧵",
    },
    Paintings: {
        from: "#0A4D46",
        via: "#0E7A6E",
        to: "#FAE5D2",
        emoji: "🎨",
    },
    "Bamboo Crafts": {
        from: "#0B5F56",
        via: "#0E7A6E",
        to: "#FAE5D2",
        emoji: "🎋",
    },
    Jewelry: {
        from: "#7E3A10",
        via: "#DD7E3A",
        to: "#FBF3E8",
        emoji: "💍",
    },
    Handicrafts: {
        from: "#56270C",
        via: "#A84D14",
        to: "#FAE5D2",
        emoji: "🪔",
    },
};

export function CraftIllustration({
    title,
    category,
    className,
}: CraftIllustrationProps) {
    const theme = CATEGORY_THEMES[category] ?? CATEGORY_THEMES.Pottery;
    return (
        <div
            className={cn(
                "relative h-full w-full overflow-hidden",
                className
            )}
            style={{
                background: `radial-gradient(ellipse at top right, ${theme.via} 0%, ${theme.from} 60%, #321707 100%)`,
            }}
        >
            {/* Decorative pattern - mandala-like circles */}
            <svg
                className="absolute inset-0 h-full w-full opacity-10"
                viewBox="0 0 400 500"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
            >
                {[...Array(8)].map((_, i) => (
                    <circle
                        key={i}
                        cx="200"
                        cy="250"
                        r={40 + i * 30}
                        fill="none"
                    />
                ))}
                {[...Array(16)].map((_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    return (
                        <line
                            key={i}
                            x1="200"
                            y1="250"
                            x2={200 + Math.cos(angle) * 250}
                            y2={250 + Math.sin(angle) * 250}
                        />
                    );
                })}
            </svg>

            {/* Soft glow */}
            <div
                className="absolute -inset-1/4 opacity-40"
                style={{
                    background: `radial-gradient(circle at 70% 30%, ${theme.to}66, transparent 50%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
                <span className="mb-3 text-6xl drop-shadow-lg sm:text-7xl">
                    {theme.emoji}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                    {category}
                </span>
                <h3 className="mt-3 max-w-[14ch] font-display text-lg font-bold leading-tight drop-shadow sm:text-xl">
                    {title}
                </h3>
                <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
                    Handmade in India
                </span>
            </div>
        </div>
    );
}
