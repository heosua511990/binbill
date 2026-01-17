'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, Star, ChevronDown, ChevronUp } from 'lucide-react'

interface FilterSidebarProps {
    uniqueTypes: string[]
}

export default function FilterSidebar({ uniqueTypes }: FilterSidebarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Local state for inputs
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [isExpanded, setIsExpanded] = useState(true)

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
        router.push(`/search?${params.toString()}`)
    }

    const toggleFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString())
        const current = params.get(key)
        if (current === 'true') {
            params.delete(key)
        } else {
            params.set(key, 'true')
        }
        router.push(`/search?${params.toString()}`)
    }

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (minPrice) params.set('minPrice', minPrice)
        else params.delete('minPrice')

        if (maxPrice) params.set('maxPrice', maxPrice)
        else params.delete('maxPrice')

        router.push(`/search?${params.toString()}`)
    }

    const currentCategory = searchParams.get('category')
    const currentType = searchParams.get('type')
    const isOnSale = searchParams.get('on_sale') === 'true'
    const isFlashSale = searchParams.get('flash_sale') === 'true'

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
                <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <input
                            type="checkbox"
                            checked={!currentCategory}
                            onChange={() => updateFilter('category', null)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Tất cả</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <input
                            type="checkbox"
                            checked={currentCategory === 'new'}
                            onChange={() => updateFilter('category', currentCategory === 'new' ? null : 'new')}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Hàng mới (New)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <input
                            type="checkbox"
                            checked={currentCategory === 'second_hand'}
                            onChange={() => updateFilter('category', currentCategory === 'second_hand' ? null : 'second_hand')}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Hàng cũ (Second Hand)</span>
                    </label>
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
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                        type="number"
                        placeholder="₫ ĐẾN"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={applyPriceFilter}
                    className="w-full py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors uppercase"
                >
                    Áp dụng
                </button>
            </div>

            {/* Status */}
            <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Dịch Vụ & Khuyến Mãi</h3>
                <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <input
                            type="checkbox"
                            checked={isFlashSale}
                            onChange={() => toggleFilter('flash_sale')}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center gap-1">Flash Sale <span className="text-xs bg-red-100 text-red-600 px-1 rounded font-bold">HOT</span></span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <input
                            type="checkbox"
                            checked={isOnSale}
                            onChange={() => toggleFilter('on_sale')}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Đang giảm giá</span>
                    </label>
                </div>
            </div>

            {/* Product Types */}
            {uniqueTypes.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Loại Sản Phẩm</h3>
                    <div className="space-y-2 text-sm max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {uniqueTypes.map(t => (
                            <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={currentType === t}
                                    onChange={() => updateFilter('type', currentType === t ? null : t)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>{t}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Rating (Mock) */}
            <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Đánh Giá</h3>
                <div className="space-y-2 text-sm">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 -ml-1 rounded">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < star ? 'fill-current' : 'text-slate-200'}`} />
                                ))}
                            </div>
                            <span className="text-slate-600 text-xs">{star !== 5 && 'trở lên'}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => router.push('/search')}
                className="w-full py-2 border border-slate-300 text-slate-600 text-sm font-medium rounded hover:bg-slate-50 transition-colors uppercase mt-4"
            >
                Xóa tất cả
            </button>
        </aside>
    )
}
