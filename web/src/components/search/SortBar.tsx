'use client'

import { useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

interface SortBarProps {
    total: number
    page?: number
    limit?: number
}

export default function SortBar({ total, page = 1, limit = 12 }: SortBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sortBy = searchParams.get('sort_by') || 'relevance'
    const [isPending, startTransition] = useTransition()

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort_by', value)
        startTransition(() => {
            router.push(`/search?${params.toString()}`)
        })
    }

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        startTransition(() => {
            router.push(`/search?${params.toString()}`)
        })
    }

    const totalPages = Math.ceil(total / limit)

    return (
        <div className="bg-slate-100 py-3 px-5 rounded mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">Sắp xếp theo</span>

                <div className="flex items-center gap-2">
                    <Button
                        variant={sortBy === 'relevance' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('relevance')}
                        isLoading={isPending && sortBy === 'relevance'}
                        size="sm"
                    >
                        Liên quan
                    </Button>
                    <Button
                        variant={sortBy === 'latest' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('latest')}
                        isLoading={isPending && sortBy === 'latest'}
                        size="sm"
                    >
                        Mới nhất
                    </Button>
                    <Button
                        variant={sortBy === 'sales' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('sales')}
                        isLoading={isPending && sortBy === 'sales'}
                        size="sm"
                    >
                        Bán chạy
                    </Button>

                    <div className="relative group">
                        <Button
                            variant={sortBy.startsWith('price') ? 'primary' : 'secondary'}
                            className="w-[200px] justify-between"
                            size="sm"
                        >
                            <span>
                                {sortBy === 'price_asc' ? 'Giá: Thấp đến Cao' : sortBy === 'price_desc' ? 'Giá: Cao đến Thấp' : 'Giá'}
                            </span>
                            {sortBy === 'price_asc' ? <ArrowUpNarrowWide className="w-4 h-4 ml-2" /> : <ArrowDownWideNarrow className="w-4 h-4 ml-2" />}
                        </Button>
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 overflow-hidden hidden group-hover:block z-10">
                            <button
                                onClick={() => handleSort('price_asc')}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                            >
                                Giá: Thấp đến Cao
                            </button>
                            <button
                                onClick={() => handleSort('price_desc')}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
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
                <div className="flex items-center gap-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={page <= 1 || isPending}
                        onClick={() => handlePageChange(page - 1)}
                        className="h-8 w-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={page >= totalPages || isPending}
                        onClick={() => handlePageChange(page + 1)}
                        className="h-8 w-8"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
