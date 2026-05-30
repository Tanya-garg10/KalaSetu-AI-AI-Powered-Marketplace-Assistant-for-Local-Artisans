import { Skeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="container-page py-10">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="mt-3 h-10 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-5 w-72" />
            <div className="mt-8 grid gap-8 lg:grid-cols-5">
                <Skeleton className="h-[600px] lg:col-span-2" />
                <Skeleton className="h-[600px] lg:col-span-3" />
            </div>
        </div>
    );
}
