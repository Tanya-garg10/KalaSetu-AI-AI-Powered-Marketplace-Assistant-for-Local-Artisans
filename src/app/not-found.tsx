import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="container-page grid min-h-[60vh] place-items-center text-center">
            <div>
                <p className="text-7xl">🪔</p>
                <h1 className="mt-4 font-display text-4xl font-bold">
                    We couldn&apos;t find that page
                </h1>
                <p className="mt-2 text-muted-foreground">
                    But there are 186,422 handmade crafts waiting in the marketplace.
                </p>
                <Button asChild variant="gradient" size="lg" className="mt-6">
                    <Link href="/marketplace">Take me to the bazaar</Link>
                </Button>
            </div>
        </div>
    );
}
