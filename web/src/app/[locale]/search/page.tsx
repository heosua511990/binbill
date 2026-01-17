import { getProducts } from '@/services/productService'
import ProductCard from '@/components/ProductCard'
import { Filter, X } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import FilterSidebar from '@/components/search/FilterSidebar'
import SortBar from '@/components/search/SortBar'

export const revalidate = 0 // Dynamic page

interface SearchPageProps {
    searchParams: {
        q?: string
        category?: string
        type?: string
        minPrice?: string
        maxPrice?: string
        on_sale?: string
        flash_sale?: string
        sort_by?: string
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const t = await getTranslations('Common')

    // Await searchParams before using properties
    const resolvedParams = await searchParams
    const { q, category, type, minPrice, maxPrice, on_sale, flash_sale, sort_by } = resolvedParams

    // Fetch all products (simulated "all" for client-side filtering)
    const { data: allProducts } = await getProducts(false, 1, 1000, { search: q })

    // Filter Logic
    let filteredProducts = allProducts.filter(product => {
        // 1. Keyword Search (already handled by getProducts if passed, but double check if needed)
        if (q) {
            const lowerQ = q.toLowerCase()
            const matchName = product.name.toLowerCase().includes(lowerQ)
            const matchDesc = product.description?.toLowerCase().includes(lowerQ)
            if (!matchName && !matchDesc) return false
        }

        // 2. Condition Filter (Category: new | second_hand)
        if (category && category !== 'sale') {
            if (product.category !== category) return false
        }

        // 3. Type Filter
        if (type && product.product_type !== type) return false

        // 4. Price Filter
        if (minPrice && product.price < Number(minPrice)) return false
        if (maxPrice && product.price > Number(maxPrice)) return false

        // 5. Status Filters
        if (on_sale === 'true') {
            const isSale = (product.original_price && product.original_price > product.price) || product.category === 'sale'
            if (!isSale) return false
        }

        if (flash_sale === 'true') {
            if (!product.is_flash_sale) return false
        }

        return true
    })

    // Sorting Logic
    if (sort_by) {
        filteredProducts.sort((a, b) => {
            switch (sort_by) {
                case 'latest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                case 'price_asc':
                    return a.price - b.price
                case 'price_desc':
                    return b.price - a.price
                case 'sales':
                    // Mock sales sort: prioritize hot items
                    return (b.is_hot ? 1 : 0) - (a.is_hot ? 1 : 0)
                default:
                    return 0
            }
        })
    }

    // Get unique types for filter sidebar
    const uniqueTypes = Array.from(new Set(allProducts.map(p => p.product_type).filter(Boolean))) as string[]

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Sidebar Filters */}
                    <FilterSidebar uniqueTypes={uniqueTypes} />

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-bold text-slate-900 mb-2">
                                {q ? `Kết quả tìm kiếm cho "${q}"` : 'Tất cả sản phẩm'}
                                <span className="ml-2 text-sm font-normal text-slate-500">({filteredProducts.length} sản phẩm)</span>
                            </h1>

                            <SortBar total={filteredProducts.length} />
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-sm border border-slate-100 shadow-sm">
                                <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900">Không tìm thấy sản phẩm</h3>
                                <p className="text-slate-500 mt-1">Hãy thử thay đổi từ khóa hoặc bộ lọc.</p>
                                <Link href="/search" className="mt-4 inline-block text-blue-600 font-medium hover:underline">
                                    Xóa tất cả bộ lọc
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
