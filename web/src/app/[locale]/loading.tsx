import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/Header"

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            {/* Hero Skeleton */}
            <div className="relative bg-white overflow-hidden mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="w-full lg:w-1/2 space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-2/3" />
                            <div className="flex gap-4 pt-4">
                                <Skeleton className="h-12 w-32 rounded-full" />
                                <Skeleton className="h-12 w-32 rounded-full" />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <Skeleton className="h-64 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden p-4 space-y-4">
                            <Skeleton className="aspect-square rounded-xl" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
