"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { ARTISANS } from "@/lib/data";
import { Badge } from "./ui/badge";
import { formatINR } from "@/lib/utils";
import { SmartImage } from "./smart-image";

const badgeStyle: Record<NonNullable<Product["badge"]>, string> = {
    "AI Featured": "bg-gradient-to-r from-terracotta-500 to-teal-500 text-white",
    Bestseller: "bg-amber-500 text-white",
    Trending: "bg-rose-500 text-white",
    "20% Off": "bg-violet-600 text-white",
    New: "bg-emerald-500 text-white",
};

export function ProductCard({ product }: { product: Product }) {
    const artisan = ARTISANS.find((a) => a.id === product.artisanId);
    return (
        <Link
            href={`/marketplace/${product.id}`}
            className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-terracotta-500/10"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <SmartImage
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    fallbackKey={product.category.toLowerCase().includes("bamboo") ? "bamboo" : (product.category.toLowerCase() as any)}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.badge && (
                    <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-md ${badgeStyle[product.badge]
                            }`}
                    >
                        {product.badge}
                    </span>
                )}
                {product.originalPrice && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-terracotta-700 backdrop-blur-sm">
                        Save {formatINR(product.originalPrice - product.price)}
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="line-clamp-1 text-[15px] font-semibold leading-tight">
                    {product.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                    {artisan?.name ?? "Artisan"}
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{product.rating}</span>
                    </span>
                    <div className="text-right">
                        {product.originalPrice && (
                            <span className="mr-1 text-xs text-muted-foreground line-through">
                                {formatINR(product.originalPrice)}
                            </span>
                        )}
                        <span className="font-display text-base font-bold text-terracotta-700">
                            {formatINR(product.price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
