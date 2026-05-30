"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const { signInEmail, signInWithGoogle, isDemo } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInEmail(email || "demo@kalasetu.ai", pass || "demo");
            toast.success("Welcome back to KalaSetu AI!");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err?.message ?? "Couldn't sign in");
        } finally {
            setLoading(false);
        }
    };

    const onGoogle = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            toast.success("Signed in with Google");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err?.message ?? "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-2">
            <div className="relative hidden h-[600px] overflow-hidden rounded-3xl lg:block">
                <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80"
                    alt="Indian artisan"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h2 className="font-display text-3xl font-bold leading-tight">
                        “The AI told my saree&apos;s story better than I ever could.”
                    </h2>
                    <p className="mt-2 text-white/80">— Meera Devi, Banarasi Weaver</p>
                </div>
            </div>

            <div className="mx-auto w-full max-w-md">
                <h1 className="font-display text-3xl font-bold">Welcome back</h1>
                <p className="mt-2 text-muted-foreground">
                    Sign in to your KalaSetu AI account.
                </p>
                {isDemo && (
                    <div className="mt-3 rounded-xl bg-terracotta-50 px-3 py-2 text-xs text-terracotta-700">
                        Demo mode — any email/password will sign you in.
                    </div>
                )}
                <Button
                    variant="outline"
                    size="lg"
                    className="mt-6 w-full"
                    onClick={onGoogle}
                    disabled={loading}
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83Z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"
                            fill="#EA4335"
                        />
                    </svg>
                    Continue with Google
                </Button>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    OR CONTINUE WITH EMAIL
                    <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ramesh@village.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="pass">Password</Label>
                        <Input
                            id="pass"
                            type="password"
                            placeholder="••••••••"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-semibold text-primary">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
