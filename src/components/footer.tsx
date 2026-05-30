import Link from "next/link";
import { Logo } from "./logo";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-24 border-t border-border/60 bg-secondary/40">
            <div className="container-page py-14">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <Logo />
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                            Empowering India&apos;s master artisans with AI-powered tools to list,
                            market and sell handmade crafts globally.
                        </p>
                        <div className="mt-5 flex gap-3">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-primary"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-primary"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-primary"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-4 w-4" />
                            </a>
                            <a
                                href="mailto:hello@kalasetu.ai"
                                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-primary"
                                aria-label="Email"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold">Marketplace</h4>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/marketplace?cat=Pottery" className="hover:text-primary">
                                    Pottery
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace?cat=Textiles" className="hover:text-primary">
                                    Textiles
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace?cat=Jewelry" className="hover:text-primary">
                                    Jewelry
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace?cat=Paintings" className="hover:text-primary">
                                    Paintings
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace?cat=Bamboo+Crafts" className="hover:text-primary">
                                    Bamboo Crafts
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace?cat=Handicrafts" className="hover:text-primary">
                                    Handicrafts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold">For Artisans</h4>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/upload" className="hover:text-primary">
                                    AI Listing Studio
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-primary">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="hover:text-primary">
                                    Become a Seller
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-primary">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin" className="hover:text-primary">
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold">Get the App</h4>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Coming soon to Android and iOS, in 12 Indian languages.
                        </p>
                        <Link
                            href="/mobile-app"
                            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                        >
                            Join the waitlist →
                        </Link>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-md border bg-card px-3 py-1.5 text-xs">हिंदी</span>
                            <span className="rounded-md border bg-card px-3 py-1.5 text-xs">தமிழ்</span>
                            <span className="rounded-md border bg-card px-3 py-1.5 text-xs">বাংলা</span>
                            <span className="rounded-md border bg-card px-3 py-1.5 text-xs">+9</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
                    <p>© 2026 KalaSetu AI · Made in India with ❤️ and Groq</p>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://opensource.org/licenses/MIT"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-border/70 bg-card px-2.5 py-0.5 font-medium hover:text-primary"
                        >
                            MIT License
                        </a>
                        <span>·</span>
                        <p>Bridging tradition and technology, one craft at a time.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
