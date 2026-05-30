import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="container-page py-10">
            <Skeleton className="h-4 w-32" />
            <div className="mt-6 grid gap-10 lg:grid-cols-2">
                <Skeleton className="aspect-square w-full rounded-3xl" />
                <div className="space-y-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-24 w-full" />
                    <div className="flex gap-2">
                        <Skeleton className="h-12 w-40 rounded-full" />
                        <Skeleton className="h-12 w-32 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
