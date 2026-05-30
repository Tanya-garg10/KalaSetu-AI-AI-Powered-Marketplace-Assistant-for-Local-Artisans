"use client";

import Image from "next/image";
import { SmartImage } from "@/components/smart-image";
import Link from "next/link";
import {
    ArrowRight,
    Search,
    Sparkles,
    Mic,
    Languages,
    TrendingUp,
    ShieldCheck,
    Star,
    Wand2,
    Globe2,
    IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import {
    CATEGORIES,
    PRODUCTS,
    TESTIMONIALS,
    ARTISANS,
} from "@/lib/data";

export default function HomePage() {
    return (
        <>
            <Hero />
            <CategoryStrip />
            <FeaturedProducts />
            <BenefitsSection />
            <ArtisanSpotlight />
            <Testimonials />
            <CTASection />
        </>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-warm-radial" />
            <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-terracotta-200/40 blur-3xl" />
            <div className="absolute -right-20 top-40 -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
                <div className="animate-fade-up">
                    <span className="pill">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        52,000+ Artisans Already Selling
                    </span>
                    <h1 className="heading-display mt-5">
                        Bridging{" "}
                        <span className="text-terracotta-600">Traditional Crafts</span>
                        <br />
                        with Modern{" "}
                        <span className="text-teal-700">Digital Markets</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                        KalaSetu AI empowers India&apos;s master artisans with AI-powered tools
                        to list, market and sell their handmade crafts globally â€” in their own
                        language.
                    </p>

                    <form className="mt-7 flex max-w-lg items-center gap-2 rounded-full border border-border/70 bg-card p-1.5 shadow-md shadow-terracotta-500/10">
                        <div className="flex flex-1 items-center gap-2 px-4">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search pottery, textiles, jewelry..."
                                className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <Button variant="gradient" size="lg" asChild>
                            <Link href="/marketplace">
                                Explore Crafts <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </form>

                    <div className="mt-8 flex flex-wrap gap-6 text-sm">
                        <Stat label="Artisans" value="52K+" />
                        <Stat label="States covered" value="28" />
                        <Stat label="AI listings created" value="1.2M" />
                        <Stat label="Avg. uplift" value="3.4x" />
                    </div>
                </div>

                <HeroVisual />
            </div>
        </section>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </div>
    );
}

function HeroVisual() {
    return (
        <div className="relative animate-fade-up">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/40 shadow-2xl shadow-terracotta-500/20 sm:aspect-[5/4]">
                <SmartImage
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80"
                    alt="Artisan at the potter's wheel"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 ai-badge">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered Instant Listing
                </span>
            </div>

            {/* AI caption card */}
            <div className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 lg:-left-6">
                <div className="glass-card flex items-start gap-3 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-terracotta-500 to-teal-500 text-white shadow-md">
                        <Sparkles className="h-4 w-4" />
                    </span>
                    <div className="text-sm">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-700">
                            AI Generated Caption
                        </div>
                        <p className="mt-1 leading-snug text-foreground/90">
                            &quot;Handcrafted Blue Pottery Vase by Master Potter Ramesh Kumar â€” 3rd
                            generation artisan from Jaipur ðŸº&quot;
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {["#JaipurBlue", "#HandmadeIndia", "#ArtisanMade"].map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-terracotta-700"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryStrip() {
    return (
        <section className="container-page mt-20">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="font-display text-2xl font-bold sm:text-3xl">
                        Explore by Craft
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Six traditions, hundreds of villages, infinite stories.
                    </p>
                </div>
                <Link
                    href="/marketplace"
                    className="hidden text-sm font-medium text-primary hover:underline sm:block"
                >
                    View all crafts â†’
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {CATEGORIES.map((c) => (
                    <Link
                        key={c.name}
                        href={`/marketplace?cat=${encodeURIComponent(c.name)}`}
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <div className="relative aspect-square">
                            <SmartImage
                                src={c.image}
                                alt={c.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-white">
                            <span className="text-sm font-semibold">{c.name}</span>
                            <span className="text-lg">{c.emoji}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function FeaturedProducts() {
    return (
        <section className="container-page mt-20">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <span className="pill mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-terracotta-500" />
                        Trending Now Â· Curated by AI
                    </span>
                    <h2 className="font-display text-2xl font-bold sm:text-3xl">
                        Featured Artisan Products
                    </h2>
                </div>
                <Link
                    href="/marketplace"
                    className="hidden text-sm font-medium text-primary hover:underline sm:block"
                >
                    View marketplace â†’
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {PRODUCTS.slice(0, 4).map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}

const BENEFITS = [
    {
        icon: Mic,
        title: "Voice-to-Listing",
        desc: "Speak in your language. Groq turns it into polished product copy.",
    },
    {
        icon: Wand2,
        title: "AI Cultural Stories",
        desc: "Every product gets a story rooted in tradition and your village.",
    },
    {
        icon: Languages,
        title: "Multilingual",
        desc: "Auto-translates listings into 12 Indian and 6 global languages.",
    },
    {
        icon: TrendingUp,
        title: "Smart Pricing",
        desc: "AI suggests fair pricing based on craft, region and demand.",
    },
    {
        icon: Globe2,
        title: "Global Reach",
        desc: "Optimized SEO and social posts so your craft travels.",
    },
    {
        icon: ShieldCheck,
        title: "Direct to Artisan",
        desc: "No middlemen. Customers buy from you, with the full story.",
    },
];

function BenefitsSection() {
    return (
        <section className="container-page mt-24">
            <div className="mx-auto max-w-2xl text-center">
                <span className="pill">
                    <Sparkles className="h-3.5 w-3.5" />
                    Why KalaSetu AI
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                    Powerful tools, designed for the{" "}
                    <span className="text-terracotta-600">hands</span> behind the craft.
                </h2>
                <p className="mt-3 text-muted-foreground">
                    We built KalaSetu so artisans don&apos;t need to learn marketing â€” they
                    just need to keep creating.
                </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
                {BENEFITS.map((b) => (
                    <div
                        key={b.title}
                        className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-terracotta-300 hover:shadow-lg"
                    >
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-terracotta-500/10 to-teal-500/10 text-terracotta-600 transition-colors group-hover:from-terracotta-500 group-hover:to-teal-500 group-hover:text-white">
                            <b.icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ArtisanSpotlight() {
    return (
        <section className="container-page mt-24">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-terracotta-700 to-terracotta-900 text-white">
                <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                    <div>
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                            Artisan Spotlight
                        </span>
                        <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                            Meet {ARTISANS[0].name},
                            <br />
                            {ARTISANS[0].generations}rd generation Blue Potter from {ARTISANS[0].location}
                        </h3>
                        <p className="mt-4 max-w-md text-white/80">
                            {ARTISANS[0].story.slice(0, 220)}â€¦
                        </p>
                        <div className="mt-6 flex gap-3">
                            <Button variant="gradient" asChild>
                                <Link href={`/artisans/${ARTISANS[0].id}`}>Read his story</Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                                asChild
                            >
                                <Link href={`/marketplace?artisan=${ARTISANS[0].id}`}>
                                    Shop his work
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <SmartImage
                            src={ARTISANS[0].cover}
                            alt={ARTISANS[0].name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="container-page mt-24">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <span className="pill">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    Loved by artisans across India
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                    Stories from the workshop floor
                </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
                {TESTIMONIALS.map((t, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                            â€œ{t.quote}â€
                        </p>
                        <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <SmartImage src={t.avatar} alt={t.name} fill className="object-cover" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold">{t.name}</div>
                                <div className="text-xs text-muted-foreground">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="container-page mt-24">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 text-center md:p-16">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream via-terracotta-50 to-teal-500/5" />
                <span className="pill">
                    <IndianRupee className="h-3.5 w-3.5" />
                    Free for artisans, forever
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">
                    Your craft deserves the world.
                    <br />
                    <span className="text-gradient-warm">Let AI help it travel.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Upload one photo and a 30-second voice note. KalaSetu AI does the rest â€”
                    instantly, in your language.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Button variant="gradient" size="xl" asChild>
                        <Link href="/upload">
                            <Sparkles className="h-4 w-4" />
                            Try the AI Studio
                        </Link>
                    </Button>
                    <Button variant="outline" size="xl" asChild>
                        <Link href="/marketplace">Explore marketplace</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
