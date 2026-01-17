'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'

interface SortBarProps {
    total: number
    page?: number
    limit?: number
}

export default function SortBar({ total, page = 1, limit = 12 }: SortBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sortBy = searchParams.get('sort_by') || 'relevance'

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort_by', value)
        router.push(`/search?${params.toString()}`)
    }

    const totalPages = Math.ceil(total / limit)

    return (
        <div className="bg-slate-100 py-3 px-5 rounded mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">Sắp xếp theo</span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleSort('relevance')}
                        className={`px-4 py-2 text-sm font-medium rounded shadow-sm transition-colors ${sortBy === 'relevance' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                    >
                        Liên quan
                    </button>
                    <button
                        onClick={() => handleSort('latest')}
                        className={`px-4 py-2 text-sm font-medium rounded shadow-sm transition-colors ${sortBy === 'latest' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                    >
                        Mới nhất
                    </button>
                    <button
                        onClick={() => handleSort('sales')}
                        className={`px-4 py-2 text-sm font-medium rounded shadow-sm transition-colors ${sortBy === 'sales' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                    >
                        Bán chạy
                    </button>

                    <div className="relative group">
                        <button className={`w-[200px] px-4 py-2 text-sm font-medium rounded shadow-sm flex items-center justify-between ${sortBy.startsWith('price') ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}>
                            <span>
                                {sortBy === 'price_asc' ? 'Giá: Thấp đến Cao' : sortBy === 'price_desc' ? 'Giá: Cao đến Thấp' : 'Giá'}
                            </span>
                            {sortBy === 'price_asc' ? <ArrowUpNarrowWide className="w-4 h-4" /> : <ArrowDownWideNarrow className="w-4 h-4" />}
                        </button>
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 overflow-hidden hidden group-hover:block z-10">
                            <button
                                onClick={() => handleSort('price_asc')}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                            >
                                Giá: Thấp đến Cao
                            </button>
                            <button
                                onClick={() => handleSort('price_desc')}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                            >
                                Giá: Cao đến Thấp
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-sm">
                    <span className="text-blue-600 font-bold">{page}</span>
                    <span className="text-slate-400">/</span>
                    <span>{totalPages}</span>
                </div>
                <div className="flex items-center rounded overflow-hidden border border-slate-200 shadow-sm">
                    <button
                        disabled={page <= 1}
                        className="p-2 bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-300 transition-colors border-r border-slate-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        disabled={page >= totalPages}
                        className="p-2 bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-300 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
