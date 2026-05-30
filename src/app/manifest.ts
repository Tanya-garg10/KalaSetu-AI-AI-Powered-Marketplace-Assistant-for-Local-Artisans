import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "KalaSetu AI",
        short_name: "KalaSetu",
        description:
            "AI-powered marketplace empowering Indian artisans to list, market and sell handmade crafts globally.",
        start_url: "/",
        display: "standalone",
        background_color: "#FBF3E8",
        theme_color: "#C9621D",
        icons: [
            { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
            { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
        ],
    };
}
