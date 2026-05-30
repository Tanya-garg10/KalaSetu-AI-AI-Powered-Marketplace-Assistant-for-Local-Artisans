import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="container-page py-12">
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-48 rounded-full" />
                    <Skeleton className="h-12 w-full max-w-md" />
                    <Skeleton className="h-12 w-full max-w-sm" />
                    <Skeleton className="h-5 w-full max-w-lg" />
                    <Skeleton className="h-12 w-full max-w-md rounded-full" />
                </div>
                <Skeleton className="aspect-[5/4] w-full rounded-3xl" />
            </div>
            <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square" />
                ))}
            </div>
        </div>
    );
}
