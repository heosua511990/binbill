import ProductSkeleton from "@/components/ProductSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/Header"

export default function SearchLoading() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Skeleton */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        <div>
                            <Skeleton className="h-5 w-24 mb-4" />
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full" />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-5 w-24 mb-4" />
                            <div className="space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full" />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Grid Skeleton */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <Skeleton className="h-8 w-64" />
                        </div>

                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {[...Array(6)].map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
