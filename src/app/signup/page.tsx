"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const { signUpEmail, signInWithGoogle, isDemo } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signUpEmail(email || "new@kalasetu.ai", pass || "demo123", name || "Artisan");
            toast.success("Welcome to KalaSetu AI! Let's set up your shop.");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err?.message ?? "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-md">
                <h1 className="font-display text-3xl font-bold">Become a seller</h1>
                <p className="mt-2 text-muted-foreground">
                    Free for artisans. Forever. Powered by Groq AI.
                </p>
                {isDemo && (
                    <div className="mt-3 rounded-xl bg-terracotta-50 px-3 py-2 text-xs text-terracotta-700">
                        Demo mode — your account is created locally for the demo.
                    </div>
                )}

                <Button
                    variant="outline"
                    size="lg"
                    className="mt-6 w-full"
                    onClick={async () => {
                        await signInWithGoogle();
                        router.push("/dashboard");
                    }}
                >
                    Continue with Google
                </Button>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    OR
                    <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Full name</Label>
                        <Input
                            id="name"
                            placeholder="Ramesh Kumar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@village.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="pass">Password</Label>
                        <Input
                            id="pass"
                            type="password"
                            placeholder="At least 6 characters"
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
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create my shop"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-primary">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="relative hidden h-[600px] overflow-hidden rounded-3xl lg:block">
                <Image
                    src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1400&q=80"
                    alt="Madhubani painting"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h2 className="font-display text-3xl font-bold leading-tight">
                        Your craft, told beautifully — in 12 languages.
                    </h2>
                    <p className="mt-2 text-white/80">
                        Upload one photo. Speak in your language. KalaSetu AI handles the rest.
                    </p>
                </div>
            </div>
        </div>
    );
}
