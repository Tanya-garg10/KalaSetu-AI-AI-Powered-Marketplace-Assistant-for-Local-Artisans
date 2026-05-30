"use client";

import * as React from "react";
import {
    auth,
    isFirebaseConfigured,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    fbSignOut,
} from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

type DemoUser = {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
};

interface AuthCtx {
    user: DemoUser | null;
    loading: boolean;
    isDemo: boolean;
    signInWithGoogle: () => Promise<void>;
    signInEmail: (email: string, pass: string) => Promise<void>;
    signUpEmail: (email: string, pass: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthCtx | null>(null);

const DEMO_KEY = "kalasetu_demo_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<DemoUser | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (isFirebaseConfigured && auth) {
            const unsub = onAuthStateChanged(auth, (u: User | null) => {
                setUser(
                    u
                        ? {
                            uid: u.uid,
                            displayName: u.displayName,
                            email: u.email,
                            photoURL: u.photoURL,
                        }
                        : null
                );
                setLoading(false);
            });
            return () => unsub();
        } else {
            const raw = typeof window !== "undefined" ? localStorage.getItem(DEMO_KEY) : null;
            if (raw) setUser(JSON.parse(raw));
            setLoading(false);
        }
    }, []);

    const persistDemo = (u: DemoUser | null) => {
        if (typeof window === "undefined") return;
        if (u) localStorage.setItem(DEMO_KEY, JSON.stringify(u));
        else localStorage.removeItem(DEMO_KEY);
    };

    const signInWithGoogle = async () => {
        if (isFirebaseConfigured && auth) {
            await signInWithPopup(auth, googleProvider);
            return;
        }
        const demo: DemoUser = {
            uid: "demo-google",
            displayName: "Ramesh Kumar",
            email: "ramesh@kalasetu.ai",
            photoURL:
                "https://images.unsplash.com/photo-1542144612-1b3641ec3459?auto=format&fit=crop&w=200&q=80",
        };
        setUser(demo);
        persistDemo(demo);
    };

    const signInEmail = async (email: string, pass: string) => {
        if (isFirebaseConfigured && auth) {
            await signInWithEmailAndPassword(auth, email, pass);
            return;
        }
        const demo: DemoUser = {
            uid: "demo-email",
            displayName: email.split("@")[0],
            email,
            photoURL: null,
        };
        setUser(demo);
        persistDemo(demo);
    };

    const signUpEmail = async (email: string, _pass: string, name: string) => {
        if (isFirebaseConfigured && auth) {
            await createUserWithEmailAndPassword(auth, email, _pass);
            return;
        }
        const demo: DemoUser = {
            uid: "demo-new",
            displayName: name,
            email,
            photoURL: null,
        };
        setUser(demo);
        persistDemo(demo);
    };

    const signOut = async () => {
        if (isFirebaseConfigured && auth) {
            await fbSignOut(auth);
            return;
        }
        setUser(null);
        persistDemo(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isDemo: !isFirebaseConfigured,
                signInWithGoogle,
                signInEmail,
                signUpEmail,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
