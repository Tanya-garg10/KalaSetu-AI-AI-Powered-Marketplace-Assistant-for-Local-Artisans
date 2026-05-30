"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";

const FALLBACKS: Record<string, string> = {
    pottery: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    textiles: "https://images.unsplash.com/photo-1606293459287-b3a3a4f6f51d?auto=format&fit=crop&w=1200&q=80",
    jewelry: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    paintings: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80",
    bamboo: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1200&q=80",
    handicrafts: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    artisan: "https://images.unsplash.com/photo-1542144612-1b3641ec3459?auto=format&fit=crop&w=400&q=80",
    default: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
};

interface SmartImageProps extends Omit<ImageProps, "src"> {
    src: string;
    fallbackKey?: keyof typeof FALLBACKS;
}

export function SmartImage({
    src,
    fallbackKey = "default",
    alt,
    ...rest
}: SmartImageProps) {
    const fallback = FALLBACKS[fallbackKey] ?? FALLBACKS.default;
    const [current, setCurrent] = React.useState(src);
    const [loaded, setLoaded] = React.useState(false);
    const [errored, setErrored] = React.useState(false);

    React.useEffect(() => {
        setCurrent(src);
        setLoaded(false);
        setErrored(false);
    }, [src]);

    // If image hasn't loaded in 4 seconds, swap to fallback
    React.useEffect(() => {
        if (loaded || errored) return;
        const t = setTimeout(() => {
            if (!loaded && !errored) {
                setErrored(true);
                setCurrent(fallback);
            }
        }, 4000);
        return () => clearTimeout(t);
    }, [current, loaded, errored, fallback]);

    return (
        <Image
            {...rest}
            src={current}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => {
                if (!errored) {
                    setErrored(true);
                    setCurrent(fallback);
                }
            }}
        />
    );
}
