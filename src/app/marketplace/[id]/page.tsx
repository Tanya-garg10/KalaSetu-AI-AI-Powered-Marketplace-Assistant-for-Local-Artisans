"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { SmartImage } from "@/components/smart-image";
import { CraftIllustration } from "@/components/craft-illustration";
import {
    Heart,
    ShoppingBag,
    Star,
    Sparkles,
    MapPin,
    Truck,
    ShieldCheck,
    Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ARTISANS, PRODUCTS, REVIEWS } from "@/lib/data";
import { formatINR } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { toast } from "sonner";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) notFound();

    const artisan = ARTISANS.find((a) => a.id === product!.artisanId);
    const reviews = REVIEWS.filter((r) => r.productId === product!.id);
    const related = PRODUCTS.filter(
        (p) => p.category === product!.category && p.id !== product!.id
    ).slice(0, 4);

    return (
        <div className="container-page py-10">
            <Link
                href="/marketplace"
                className="text-sm text-muted-foreground hover:text-foreground"
            >
                ← Back to marketplace
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-card">
                    <CraftIllustration
                        title={product!.title}
                        category={product!.category}
                    />
                    {product!.badge && (
                        <Badge variant="ai" className="absolute left-4 top-4">
                            <Sparkles className="mr-1 h-3 w-3" />
                            {product!.badge}
                        </Badge>
                    )}
                </div>

                {/* Info */}
                <div>
                    <Badge variant="soft">{product!.category}</Badge>
                    <h1 className="mt-3 font-display text-3xl font-700 sm:text-4xl">
                        {product!.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-foreground">{product!.rating}</span>
                            <span>({product!.reviews} reviews)</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {product!.location}
                        </span>
                    </div>

                    <div className="mt-5 flex items-end gap-3">
                        <div className="font-display text-3xl font-700 text-terracotta-700">
                            {formatINR(product!.price)}
                        </div>
                        {product!.originalPrice && (
                            <div className="pb-1 text-base text-muted-foreground line-through">
                                {formatINR(product!.originalPrice)}
                            </div>
                        )}
                    </div>

                    <p className="mt-5 text-foreground/85">{product!.description}</p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                        {product!.hashtags.map((h) => (
                            <span
                                key={h}
                                className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-terracotta-700"
                            >
                                {h}
                            </span>
                        ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Button
                            variant="gradient"
                            size="lg"
                            onClick={() => toast.success("Added to cart!")}
                        >
                            <ShoppingBag className="h-4 w-4" /> Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => toast.success("Saved to wishlist!")}
                        >
                            <Heart className="h-4 w-4" /> Wishlist
                        </Button>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-7 grid gap-3 rounded-2xl border bg-card p-4 sm:grid-cols-3">
                        <Trust icon={Truck} title="Free shipping" sub="on orders over ₹999" />
                        <Trust icon={ShieldCheck} title="Authentic" sub="verified by artisan" />
                        <Trust icon={Languages} title="12 languages" sub="story translated" />
                    </div>

                    {/* Artisan card */}
                    {artisan && (
                        <Link
                            href={`/artisans/${artisan.id}`}
                            className="mt-6 flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-all hover:border-terracotta-300 hover:shadow-md"
                        >
                            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-terracotta-200">
                                <SmartImage src={artisan.avatar} alt={artisan.name} fill fallbackKey="artisan" className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold">{artisan.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {artisan.craft} · {artisan.generations}rd generation
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Read story →
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-14">
                <Tabs defaultValue="story">
                    <TabsList>
                        <TabsTrigger value="story">Cultural Story</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    </TabsList>
                    <TabsContent value="story">
                        <div className="rounded-3xl border bg-card p-7">
                            <div className="mb-3 flex items-center gap-2 text-terracotta-700">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-xs font-semibold uppercase tracking-wide">
                                    AI Generated Story
                                </span>
                            </div>
                            <p className="leading-relaxed text-foreground/90">
                                {product!.story}
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <div className="space-y-4">
                            {reviews.length === 0 && (
                                <p className="text-sm text-muted-foreground">No reviews yet.</p>
                            )}
                            {reviews.map((r) => (
                                <div key={r.id} className="rounded-2xl border bg-card p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="font-semibold">{r.author}</div>
                                        <div className="flex">
                                            {[...Array(r.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm">{r.comment}</p>
                                    <p className="mt-2 text-xs text-muted-foreground">{r.date}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="shipping">
                        <div className="rounded-3xl border bg-card p-7 text-sm text-muted-foreground">
                            Ships from {product!.location} within 3-5 business days. Free shipping on
                            orders over ₹999. International shipping available to 80+ countries.
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section className="mt-16">
                    <h2 className="mb-5 font-display text-2xl font-700">More from this craft</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function Trust({
    icon: Icon,
    title,
    sub,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    sub: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-terracotta-600">
                <Icon className="h-4 w-4" />
            </span>
            <div>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
            </div>
        </div>
    );
}
