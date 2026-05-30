"use client";

import Link from "next/link";
import { Check, Sparkles, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
    {
        name: "Karigar",
        tagline: "For artisans starting their digital journey",
        price: "Free",
        icon: Sparkles,
        cta: "Start free",
        href: "/signup",
        highlighted: false,
        features: [
            "Up to 10 product listings",
            "AI marketing kit (5 generations / month)",
            "Voice-to-text in Hindi & English",
            "Basic analytics",
            "Marketplace listing",
        ],
    },
    {
        name: "Master",
        tagline: "For established artisans growing their shop",
        price: "₹499",
        period: "/ month",
        icon: Crown,
        cta: "Start 14-day trial",
        href: "/signup",
        highlighted: true,
        features: [
            "Unlimited listings",
            "Unlimited AI marketing generations",
            "12 Indian + 6 global languages",
            "Smart pricing & festival hooks",
            "Priority placement in search",
            "Advanced sales analytics",
            "Custom artisan story page",
        ],
    },
    {
        name: "Atelier",
        tagline: "For collectives, NGOs and craft brands",
        price: "Custom",
        icon: Rocket,
        cta: "Talk to sales",
        href: "mailto:hello@kalasetu.ai",
        highlighted: false,
        features: [
            "Everything in Master",
            "Up to 50 artisan accounts",
            "White-label storefront",
            "Dedicated success manager",
            "Custom AI tone & language packs",
            "Bulk export & ERP integration",
            "On-ground onboarding workshops",
        ],
    },
];

const FAQ = [
    {
        q: "Is KalaSetu AI really free for artisans?",
        a: "Yes. The Karigar plan is permanently free for individual artisans. You only upgrade if you need unlimited AI generations or premium placement.",
    },
    {
        q: "Do you take a commission on sales?",
        a: "We charge a flat 4% transaction fee on Master and a 0% commission on Karigar — we cover payment gateway costs.",
    },
    {
        q: "Which Indian languages are supported?",
        a: "Hindi, Tamil, Bengali, Marathi, Telugu, Kannada, Malayalam, Punjabi, Gujarati, Odia, Assamese and Urdu — for both voice input and content generation.",
    },
    {
        q: "Can I cancel anytime?",
        a: "Absolutely. No contracts, no lock-ins. Downgrade to Karigar with one click — your data stays.",
    },
];

export default function PricingPage() {
    return (
        <div className="container-page py-16">
            <div className="mx-auto max-w-2xl text-center">
                <span className="pill">
                    <Sparkles className="h-3.5 w-3.5" />
                    Simple, artisan-friendly pricing
                </span>
                <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
                    Pay only as your craft grows
                </h1>
                <p className="mt-3 text-muted-foreground">
                    Start free, upgrade when you&apos;re ready. We never charge artisans for
                    the AI itself — only for advanced placement and analytics.
                </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col rounded-3xl border p-7 transition-all ${plan.highlighted
                                ? "border-terracotta-300 bg-gradient-to-br from-terracotta-700 to-terracotta-900 text-white shadow-xl shadow-terracotta-500/30"
                                : "border-border/60 bg-card hover:-translate-y-1 hover:shadow-md"
                            }`}
                    >
                        {plan.highlighted && (
                            <span className="absolute -top-3 right-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950 shadow-md">
                                Most popular
                            </span>
                        )}
                        <span
                            className={`grid h-11 w-11 place-items-center rounded-xl ${plan.highlighted
                                    ? "bg-white/15 text-white"
                                    : "bg-secondary text-terracotta-600"
                                }`}
                        >
                            <plan.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 font-display text-2xl font-bold">{plan.name}</h3>
                        <p
                            className={`mt-1 text-sm ${plan.highlighted ? "text-white/80" : "text-muted-foreground"
                                }`}
                        >
                            {plan.tagline}
                        </p>

                        <div className="mt-6 flex items-baseline gap-1">
                            <span className="font-display text-4xl font-bold">{plan.price}</span>
                            {plan.period && (
                                <span
                                    className={
                                        plan.highlighted ? "text-white/70" : "text-muted-foreground"
                                    }
                                >
                                    {plan.period}
                                </span>
                            )}
                        </div>

                        <ul className="mt-6 flex-1 space-y-3 text-sm">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-2">
                                    <Check
                                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-amber-300" : "text-emerald-600"
                                            }`}
                                    />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant={plan.highlighted ? "gradient" : "outline"}
                            size="lg"
                            className={`mt-7 w-full ${plan.highlighted ? "" : "border-terracotta-300 hover:bg-terracotta-50"
                                }`}
                            asChild
                        >
                            <Link href={plan.href}>{plan.cta}</Link>
                        </Button>
                    </div>
                ))}
            </div>

            {/* FAQ */}
            <div className="mx-auto mt-20 max-w-3xl">
                <h2 className="text-center font-display text-3xl font-bold">
                    Frequently asked questions
                </h2>
                <div className="mt-8 space-y-3">
                    {FAQ.map((item) => (
                        <details
                            key={item.q}
                            className="group rounded-2xl border bg-card p-5 [&[open]>summary>span:last-child]:rotate-180"
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold">
                                {item.q}
                                <span className="text-terracotta-600 transition-transform">▾</span>
                            </summary>
                            <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="mx-auto mt-20 max-w-3xl rounded-3xl border bg-gradient-to-br from-cream to-terracotta-50 p-10 text-center">
                <h3 className="font-display text-2xl font-bold sm:text-3xl">
                    Ready to take your craft online?
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Set up your shop in 5 minutes. No credit card required.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button size="lg" variant="gradient" asChild>
                        <Link href="/signup">Become a seller</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/marketplace">Explore marketplace</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
