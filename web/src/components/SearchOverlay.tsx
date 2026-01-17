'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from '@/i18n/routing'
import { Search, X, Loader2, TrendingUp } from 'lucide-react'
import { Product } from '@/types'
import { getProducts } from '@/services/productService'
import { Link } from '@/i18n/routing'

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

export default function SearchOverlay() {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [results, setResults] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const debouncedQuery = useDebounce(query, 300)

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch results
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery.trim()) {
                setResults([])
                return
            }

            setLoading(true)
            try {
                // In a real app, you'd have a dedicated search API. 
                // Here we fetch all (cached) and filter client-side for demo speed, 
                // or better: call a server action that filters DB side.
                // For now, let's assume getProducts returns all and we filter.
                // ideally: await searchProducts(debouncedQuery)
                const all = await getProducts(false)
                const filtered = all.filter(p =>
                    p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
                ).slice(0, 5) // Limit 5
                setResults(filtered)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [debouncedQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            setIsOpen(false)
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div ref={containerRef} className="flex-1 max-w-2xl relative group z-50">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="What are you looking for today?"
                    className="w-full pl-4 pr-12 py-2.5 bg-slate-100 border border-transparent focus:bg-white focus:border-blue-500 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
                <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 text-slate-500 hover:text-blue-600 transition-colors"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
            </form>

            {/* Dropdown Results */}
            {isOpen && query.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
                    {results.length > 0 ? (
                        <div>
                            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                                <span>Products</span>
                                <span className="text-blue-600">{results.length} found</span>
                            </div>
                            <ul>
                                {results.map(product => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/product/${product.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-colors group/item"
                                        >
                                            <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden flex-shrink-0">
                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-slate-900 truncate group-hover/item:text-blue-700">{product.name}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-sm font-bold text-red-600">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                    </span>
                                                    {product.original_price && product.original_price > product.price && (
                                                        <span className="text-xs text-slate-400 line-through">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.original_price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`/search?q=${encodeURIComponent(query)}`}
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 border-t border-slate-100 transition-colors"
                            >
                                View all results for "{query}"
                            </Link>
                        </div>
                    ) : (
                        !loading && (
                            <div className="p-8 text-center text-slate-500">
                                <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                <p className="text-sm">No products found for "{query}"</p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}
