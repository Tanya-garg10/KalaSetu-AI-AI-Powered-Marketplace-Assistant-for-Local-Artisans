import { ProductGridSkeleton, Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <>
            <Skeleton className="h-[42vh] min-h-[320px] w-full rounded-none" />
            <div className="container-page -mt-32 relative z-10">
                <div className="rounded-3xl border bg-card p-8">
                    <div className="flex flex-col gap-6 md:flex-row">
                        <Skeleton className="h-32 w-32 rounded-3xl" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-9 w-64" />
                            <Skeleton className="h-4 w-full max-w-lg" />
                            <Skeleton className="h-4 w-72" />
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <Skeleton className="mb-5 h-8 w-64" />
                    <ProductGridSkeleton count={4} />
                </div>
            </div>
        </>
    );
}
