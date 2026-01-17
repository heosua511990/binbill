import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="aspect-square bg-slate-50 p-4">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    )
}
