import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export default function ProductLoading() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb Skeleton */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                        <ArrowLeft className="w-4 h-4 text-slate-300" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-0">
                        {/* Image Skeleton */}
                        <div className="aspect-square lg:aspect-auto bg-slate-100 p-8 lg:p-16 flex items-center justify-center">
                            <Skeleton className="w-3/4 h-3/4 rounded-2xl" />
                        </div>

                        {/* Info Skeleton */}
                        <div className="p-8 lg:p-16 flex flex-col justify-center space-y-8">
                            <div>
                                <Skeleton className="h-6 w-32 rounded-full mb-4" />
                                <Skeleton className="h-12 w-3/4 mb-4" />
                                <Skeleton className="h-10 w-48" />
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-6">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>

                            <div className="flex gap-4">
                                <Skeleton className="h-14 flex-1 rounded-xl" />
                                <Skeleton className="h-14 flex-1 rounded-xl" />
                            </div>
                            <Skeleton className="h-14 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
