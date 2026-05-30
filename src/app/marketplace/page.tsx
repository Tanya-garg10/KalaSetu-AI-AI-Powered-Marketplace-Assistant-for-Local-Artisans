"use client";

import * as React from "react";
import Image from "next/image";
import { SmartImage } from "@/components/smart-image";
import { useSearchParams } from "next/navigation";
import { Filter, Search, Sparkles, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const SORTS = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low"];

export default function MarketplacePage() {
    return (
        <React.Suspense fallback={<div className="container-page py-20 text-center text-muted-foreground">Loading marketplaceâ€¦</div>}>
            <MarketplaceContent />
        </React.Suspense>
    );
}

function MarketplaceContent() {
    const params = useSearchParams();
    const initialCat = params.get("cat");
    const initialQuery = params.get("q") ?? "";
    const [activeCat, setActiveCat] = React.useState<Category | "All">(
        (initialCat as Category) || "All"
    );
    const [query, setQuery] = React.useState(initialQuery);
    const [sort, setSort] = React.useState(SORTS[0]);

    // React to URL changes (e.g. clicking footer category links)
    React.useEffect(() => {
        const cat = params.get("cat");
        setActiveCat((cat as Category) || "All");
    }, [params]);

    const products = React.useMemo(() => {
        let list = PRODUCTS.filter((p) =>
            activeCat === "All" ? true : p.category === activeCat
        );
        if (query) {
            const q = query.toLowerCase();
            list = list.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.location.toLowerCase().includes(q)
            );
        }
        if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
        if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
        if (sort === "Newest") list = [...list].reverse();
        return list;
    }, [activeCat, query, sort]);

    return (
        <>
            {/* Filter bar */}
            <section className="sticky top-16 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
                <div className="container-page flex flex-wrap items-center gap-3 py-4">
                    <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 shadow-sm">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search crafts, artisans, regions..."
                            className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
                        {(["All", ...CATEGORIES.map((c) => c.name)] as const).map((c) => {
                            const active = activeCat === c;
                            return (
                                <button
                                    key={c}
                                    onClick={() => setActiveCat(c as Category | "All")}
                                    className={cn(
                                        "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                                        active
                                            ? "bg-terracotta-600 text-white shadow-md shadow-terracotta-500/30"
                                            : "bg-secondary text-foreground hover:bg-secondary/70"
                                    )}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="hidden h-10 rounded-full border border-border bg-card px-4 text-sm font-medium md:block"
                    >
                        {SORTS.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>

                    <Button variant="outline" className="hidden md:inline-flex">
                        <SlidersHorizontal className="h-4 w-4" /> Filters
                    </Button>
                </div>
            </section>

            {/* Trending */}
            <section className="container-page mt-8">
                <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white shadow-md">
                        <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                        <h2 className="font-display text-xl font-bold sm:text-2xl">Trending Now</h2>
                        <p className="text-xs text-muted-foreground">Curated by AI</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {products.slice(0, 4).map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            {/* Festival Picks Banner */}
            <section className="container-page mt-10">
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-terracotta-700 via-terracotta-800 to-terracotta-900 p-6 text-white sm:p-8">
                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-terracotta-500/40 blur-3xl" />
                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">ðŸª”</span>
                                <h3 className="font-display text-xl font-bold sm:text-2xl">
                                    Festival Season Picks
                                </h3>
                            </div>
                            <p className="mt-1 max-w-xl text-sm text-white/80">
                                Perfect gifts and decor for Diwali, Holi, Navratri & Eid â€” handpicked by our AI.
                            </p>
                        </div>
                        <span className="self-start rounded-full bg-white/15 px-3 py-1 text-xs font-medium md:self-auto">
                            AI Recommended
                        </span>
                    </div>
                    <div className="mt-5 grid grid-cols-4 gap-3">
                        {PRODUCTS.slice(1, 5).map((p) => (
                            <div
                                key={p.id}
                                className="relative aspect-square overflow-hidden rounded-2xl border border-white/15"
                            >
                                <SmartImage
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    className="object-cover transition-transform hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All products */}
            <section className="container-page mt-10 pb-16">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold sm:text-2xl">
                        All Crafts <span className="text-muted-foreground">({products.length})</span>
                    </h2>
                    <button className="md:hidden inline-flex items-center gap-1 rounded-full border bg-card px-3 py-1.5 text-sm">
                        <Filter className="h-3.5 w-3.5" /> Filter
                    </button>
                </div>
                {products.length === 0 ? (
                    <div className="rounded-3xl border border-dashed py-16 text-center">
                        <p className="text-muted-foreground">No crafts match your filters yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
