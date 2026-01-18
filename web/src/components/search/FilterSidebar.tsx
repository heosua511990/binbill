'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface FilterSidebarProps {
    uniqueTypes: string[]
}

export default function FilterSidebar({ uniqueTypes }: FilterSidebarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Local state for inputs
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')

    // Update local state when URL params change
    useEffect(() => {
        setMinPrice(searchParams.get('minPrice') || '')
        setMaxPrice(searchParams.get('maxPrice') || '')
    }, [searchParams])

    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === null) {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        startTransition(() => {
            router.push(`/search?${params.toString()}`)
        })
    }

    const toggleFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString())
        const current = params.get(key)
        if (current === 'true') {
            params.delete(key)
        } else {
            params.set(key, 'true')
        }
        startTransition(() => {
            router.push(`/search?${params.toString()}`)
        })
    }

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (minPrice) params.set('minPrice', minPrice)
        else params.delete('minPrice')

        if (maxPrice) params.set('maxPrice', maxPrice)
        else params.delete('maxPrice')

        startTransition(() => {
            router.push(`/search?${params.toString()}`)
        })
    }

    const clearAll = () => {
        startTransition(() => {
            router.push('/search')
        })
    }

    const currentCategory = searchParams.get('category')
    const currentType = searchParams.get('type')
    const isOnSale = searchParams.get('on_sale') === 'true'
    const isFlashSale = searchParams.get('flash_sale') === 'true'

    const FilterOption = ({ label, checked, onChange }: { label: React.ReactNode, checked: boolean, onChange: () => void }) => (
        <motion.label
            className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${checked ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'}`}
            whileTap={{ scale: 0.98 }}
        >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                {checked && <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></motion.svg>}
            </div>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <span className="text-sm font-medium">{label}</span>
        </motion.label>
    )

    return (
        <aside className="w-full lg:w-[250px] flex-shrink-0 space-y-8 pr-4">
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                <Filter className="w-4 h-4" />
                <h2 className="font-bold text-slate-900 uppercase text-sm">Bộ lọc tìm kiếm</h2>
            </div>

            {/* Categories (Condition) */}
            <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Theo Danh Mục</h3>
                <div className="space-y-1">
                    <FilterOption
                        label="Tất cả"
                        checked={!currentCategory}
                        onChange={() => updateFilter('category', null)}
                    />
                    <FilterOption
                        label="Hàng mới (New)"
                        checked={currentCategory === 'new'}
                        onChange={() => updateFilter('category', currentCategory === 'new' ? null : 'new')}
                    />
                    <FilterOption
                        label="Hàng cũ (Second Hand)"
                        checked={currentCategory === 'second_hand'}
                        onChange={() => updateFilter('category', currentCategory === 'second_hand' ? null : 'second_hand')}
                    />
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Khoảng Giá</h3>
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="number"
                        placeholder="₫ TỪ"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full px-2 py-2 text-sm border border-slate-300 rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                        type="number"
                        placeholder="₫ ĐẾN"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-2 py-2 text-sm border border-slate-300 rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>
                <Button
                    onClick={applyPriceFilter}
                    className="w-full uppercase"
                    isLoading={isPending}
                    size="sm"
                >
                    Áp dụng
                </Button>
            </div>

            {/* Status */}
            <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Dịch Vụ & Khuyến Mãi</h3>
                <div className="space-y-1">
                    <FilterOption
                        label={<span className="flex items-center gap-1">Flash Sale <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">HOT</span></span>}
                        checked={isFlashSale}
                        onChange={() => toggleFilter('flash_sale')}
                    />
                    <FilterOption
                        label="Đang giảm giá"
                        checked={isOnSale}
                        onChange={() => toggleFilter('on_sale')}
                    />
                </div>
            </div>

            {/* Product Types */}
            {uniqueTypes.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Loại Sản Phẩm</h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {uniqueTypes.map(t => (
                            <FilterOption
                                key={t}
                                label={t}
                                checked={currentType === t}
                                onChange={() => updateFilter('type', currentType === t ? null : t)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <Button
                variant="outline"
                onClick={clearAll}
                className="w-full uppercase mt-4"
                disabled={isPending}
            >
                Xóa tất cả
            </Button>
        </aside>
    )
}
