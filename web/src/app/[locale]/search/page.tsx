import { getProducts } from '@/services/productService'
import ProductCard from '@/components/ProductCard'
import { Search, Filter, X } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0 // Dynamic page

interface SearchPageProps {
    searchParams: {
        q?: string
        category?: string
        type?: string
        minPrice?: string
        maxPrice?: string
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const t = await getTranslations('Common')
    const tNav = await getTranslations('Navigation')

    const allProducts = await getProducts(false)
    const { q, category, type, minPrice, maxPrice } = await searchParams

    // Filter Logic
    const filteredProducts = allProducts.filter(product => {
        // 1. Keyword Search
        if (q) {
            const lowerQ = q.toLowerCase()
            const matchName = product.name.toLowerCase().includes(lowerQ)
            const matchDesc = product.description?.toLowerCase().includes(lowerQ)
            if (!matchName && !matchDesc) return false
        }

        // 2. Category Filter
        if (category && product.category !== category) return false

        // 3. Type Filter
        if (type && product.product_type !== type) return false

        // 4. Price Filter
        if (minPrice && product.price < Number(minPrice)) return false
        if (maxPrice && product.price > Number(maxPrice)) return false

        return true
    })

    // Get unique types for filter sidebar
    const uniqueTypes = Array.from(new Set(allProducts.map(p => p.product_type).filter(Boolean))) as string[]

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Nav (Simplified) */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex-shrink-0">
                        <img src="/Logo-BinBill.png" alt="BinBill" className="h-8 w-auto" />
                    </Link>

                    {/* Search Bar */}
                    <form className="flex-1 max-w-lg relative">
                        <input
                            type="text"
                            name="q"
                            defaultValue={q}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 rounded-full text-sm focus:ring-0 transition-all"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </form>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-blue-600 transition-colors">{tNav('home')}</Link>
                        <Link href="/search" className="text-blue-600">{tNav('products')}</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Categories</h3>
                            <div className="space-y-2">
                                <Link href="/search" className={`block text-sm ${!category ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
                                    All Categories
                                </Link>
                                <Link href="/search?category=new" className={`block text-sm ${category === 'new' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
                                    New Arrivals
                                </Link>
                                <Link href="/search?category=sale" className={`block text-sm ${category === 'sale' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
                                    Flash Sale
                                </Link>
                                <Link href="/search?category=second_hand" className={`block text-sm ${category === 'second_hand' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
                                    Second Hand
                                </Link>
                            </div>
                        </div>

                        {/* Types */}
                        {uniqueTypes.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Product Type</h3>
                                <div className="space-y-2">
                                    {uniqueTypes.map(t => (
                                        <Link
                                            key={t}
                                            href={`/search?type=${t}${category ? `&category=${category}` : ''}`}
                                            className={`block text-sm ${type === t ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                                        >
                                            {t}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Clear Filters */}
                        {(q || category || type) && (
                            <Link href="/search" className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
                                <X className="w-4 h-4" /> Clear All Filters
                            </Link>
                        )}
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-xl font-bold text-slate-900">
                                {q ? `Search results for "${q}"` : 'All Products'}
                                <span className="ml-2 text-sm font-normal text-slate-500">({filteredProducts.length} items)</span>
                            </h1>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                                <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                                <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
                                <Link href="/search" className="mt-4 inline-block text-blue-600 font-medium hover:underline">
                                    Clear all filters
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
