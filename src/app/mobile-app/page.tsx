"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Smartphone, Mic, Languages, Zap, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FEATURES = [
    {
        icon: Mic,
        title: "Voice-first",
        desc: "Tap, speak in your language, your listing is ready.",
    },
    {
        icon: Languages,
        title: "12 Indian languages",
        desc: "Hindi, Tamil, Bengali, Marathi, Telugu, Kannada and more.",
    },
    {
        icon: Zap,
        title: "Works offline",
        desc: "Capture orders even on 2G village networks. Syncs when online.",
    },
];

export default function MobileAppPage() {
    const [email, setEmail] = React.useState("");
    return (
        <div className="container-page py-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <span className="pill">
                        <Smartphone className="h-3.5 w-3.5" />
                        Coming Soon · Beta in September 2026
                    </span>
                    <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                        Your craft shop,
                        <br />
                        <span className="text-terracotta-600">in your pocket.</span>
                    </h1>
                    <p className="mt-4 max-w-lg text-muted-foreground">
                        The KalaSetu AI mobile app is built for artisans who run their workshop
                        from their phone. Voice-first, multilingual, and works on entry-level
                        Android devices.
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!email) return;
                            toast.success("You're on the list! We'll email you when the app launches.");
                            setEmail("");
                        }}
                        className="mt-8 flex max-w-md gap-2"
                    >
                        <Input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@village.com"
                            className="h-12 rounded-full px-5"
                        />
                        <Button variant="gradient" size="lg" type="submit">
                            Notify me
                        </Button>
                    </form>

                    <div className="mt-6 flex gap-3">
                        <span className="inline-flex items-center gap-2 rounded-2xl border bg-card px-4 py-2.5 text-sm">
                            <Apple className="h-4 w-4" /> iOS · soon
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-2xl border bg-card px-4 py-2.5 text-sm">
                            <Smartphone className="h-4 w-4" /> Android · soon
                        </span>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="rounded-2xl border bg-card p-4">
                                <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-terracotta-600">
                                    <f.icon className="h-4 w-4" />
                                </span>
                                <div className="mt-3 text-sm font-semibold">{f.title}</div>
                                <p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phone mockup */}
                <div className="relative mx-auto w-full max-w-sm">
                    <div className="relative aspect-[9/19] overflow-hidden rounded-[2.5rem] border-[10px] border-foreground/90 bg-foreground shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80"
                            alt="KalaSetu app preview"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-x-0 top-0 h-6 bg-foreground" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
                            <span className="ai-badge">
                                <Mic className="h-3 w-3" /> Recording...
                            </span>
                            <p className="mt-3 text-sm">
                                &quot;Yeh blue pottery vase Jaipur se hai, peacock motifs ke saath...&quot;
                            </p>
                        </div>
                    </div>
                    <div className="absolute -right-4 top-10 hidden rounded-2xl border bg-card p-3 shadow-lg md:block">
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-terracotta-700">
                            AI Generated · 1.2s
                        </div>
                        <div className="mt-1 text-xs">15 hashtags ready</div>
                    </div>
                    <div className="absolute -left-4 bottom-16 hidden rounded-2xl border bg-card p-3 shadow-lg md:block">
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                            Listing Live
                        </div>
                        <div className="mt-1 text-xs">English + Hindi</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
