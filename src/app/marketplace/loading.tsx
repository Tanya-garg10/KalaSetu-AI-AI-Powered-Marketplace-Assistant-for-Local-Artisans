import { ProductGridSkeleton, Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <>
            <div className="border-b border-border/60 bg-background/85 backdrop-blur-md">
                <div className="container-page flex flex-wrap items-center gap-3 py-4">
                    <Skeleton className="h-11 flex-1 rounded-full" />
                    <div className="flex gap-2">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-9 w-20 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="container-page mt-8">
                <Skeleton className="mb-6 h-7 w-48" />
                <ProductGridSkeleton count={8} />
            </div>
        </>
    );
}
