"use client";

import { notFound, useParams } from "next/navigation";
import { MapPin, Sparkles, Star, Award, Calendar } from "lucide-react";
import { ARTISANS, PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { SmartImage } from "@/components/smart-image";
import { ArtisanActions } from "@/components/artisan-actions";

export default function ArtisanPage() {
    const { id } = useParams<{ id: string }>();
    const artisan = ARTISANS.find((a) => a.id === id);
    if (!artisan) notFound();

    const products = PRODUCTS.filter((p) => p.artisanId === artisan!.id);

    return (
        <>
            {/* Hero */}
            <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
                <SmartImage
                    src={artisan!.cover}
                    alt={artisan!.name}
                    fill
                    fallbackKey="pottery"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </section>

            <div className="container-page -mt-32 relative z-10">
                <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-xl">
                    <div className="flex flex-col items-start gap-6 md:flex-row">
                        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border-4 border-card shadow-lg">
                            <SmartImage
                                src={artisan!.avatar}
                                alt={artisan!.name}
                                fill
                                fallbackKey="artisan"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-terracotta-50 px-3 py-1 text-xs font-medium text-terracotta-700">
                                    {artisan!.craft}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {artisan!.location}, {artisan!.state}
                                </span>
                            </div>
                            <h1 className="mt-2 font-display text-3xl font-700 sm:text-4xl">
                                {artisan!.name}
                            </h1>
                            <p className="mt-2 max-w-2xl text-muted-foreground">{artisan!.bio}</p>
                            <div className="mt-4 flex flex-wrap gap-5 text-sm">
                                <Stat
                                    icon={Star}
                                    label="Rating"
                                    value={`${artisan!.rating} / 5`}
                                />
                                <Stat
                                    icon={Award}
                                    label="Generations"
                                    value={`${artisan!.generations}`}
                                />
                                <Stat
                                    icon={Calendar}
                                    label="Crafts created"
                                    value={`${artisan!.productsCount}+`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <ArtisanActions artisan={artisan!} />
                        </div>
                    </div>
                </div>

                {/* Story */}
                <section className="mt-12 grid gap-8 lg:grid-cols-3">
                    <div className="rounded-3xl border bg-card p-7 lg:col-span-2">
                        <div className="mb-3 flex items-center gap-2 text-terracotta-700">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wide">
                                AI Storytelling
                            </span>
                        </div>
                        <h2 className="font-display text-2xl font-700">The craft, the village, the hands</h2>
                        <p className="mt-4 leading-relaxed text-foreground/90">
                            {artisan!.story}
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square overflow-hidden rounded-2xl"
                                >
                                    <SmartImage
                                        src={products[i % products.length]?.image ?? artisan!.cover}
                                        alt={artisan!.craft}
                                        fill
                                        fallbackKey="pottery"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="space-y-5">
                        <div className="rounded-3xl border bg-gradient-to-br from-terracotta-50 to-cream p-6">
                            <h3 className="font-display text-lg font-700">Cultural Significance</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {artisan!.craft} is a living tradition with roots over a century
                                old. By choosing one of {artisan!.name}&apos;s pieces, you support a
                                family of {artisan!.generations} generations and help keep the
                                craft alive for the next.
                            </p>
                        </div>
                        <div className="rounded-3xl border bg-card p-6">
                            <h3 className="font-display text-lg font-700">Verified by KalaSetu</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Each piece carries a digital provenance certificate signed by our
                                artisan verification network.
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    window.dispatchEvent(
                                        new CustomEvent("kalasetu:open-cert", { detail: artisan!.id })
                                    )
                                }
                                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                            >
                                View certificate →
                            </button>
                        </div>
                    </aside>
                </section>

                {/* Products */}
                <section className="mt-14 pb-16">
                    <h2 className="mb-5 font-display text-2xl font-700">Crafts by {artisan!.name}</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

function Stat({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-terracotta-600" />
            <span className="font-semibold">{value}</span>
            <span className="text-muted-foreground">· {label}</span>
        </div>
    );
}
