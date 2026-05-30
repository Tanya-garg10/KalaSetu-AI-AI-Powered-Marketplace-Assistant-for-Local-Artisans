import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: {
        default: "KalaSetu AI · Bridging Traditional Crafts with Modern Digital Markets",
        template: "%s · KalaSetu AI",
    },
    description:
        "AI-powered marketplace empowering Indian artisans to list, market and sell handmade crafts globally. Powered by Groq AI.",
    keywords: [
        "Indian artisans",
        "handmade crafts",
        "AI marketplace",
        "Groq AI",
        "handicrafts",
        "pottery",
        "Banarasi silk",
        "Madhubani",
        "Dhokra",
        "Pashmina",
    ],
    authors: [{ name: "KalaSetu AI" }],
    creator: "KalaSetu AI",
    openGraph: {
        title: "KalaSetu AI · Bridging Traditional Crafts with Modern Digital Markets",
        description:
            "AI-powered marketplace empowering Indian artisans to list, market and sell handmade crafts globally.",
        type: "website",
        locale: "en_IN",
        siteName: "KalaSetu AI",
    },
    twitter: {
        card: "summary_large_image",
        title: "KalaSetu AI",
        description:
            "Bridging Traditional Crafts with Modern Digital Markets — powered by AI.",
    },
    manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#C9621D" },
        { media: "(prefers-color-scheme: dark)", color: "#321707" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-warm-radial">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <AuthProvider>
                        <div className="craft-pattern flex min-h-screen flex-col">
                            <Navbar />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                        <Toaster
                            position="top-right"
                            richColors
                            toastOptions={{
                                style: { borderRadius: "12px" },
                            }}
                        />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
