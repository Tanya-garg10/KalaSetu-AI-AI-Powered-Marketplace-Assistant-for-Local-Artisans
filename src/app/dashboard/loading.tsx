import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="container-page py-10">
            <Skeleton className="h-9 w-72" />
            <Skeleton className="mt-2 h-4 w-96" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-28" />
                ))}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Skeleton className="h-80 lg:col-span-2" />
                <Skeleton className="h-80" />
            </div>
        </div>
    );
}
