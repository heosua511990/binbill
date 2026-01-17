'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Product } from '@/types'
import { getProducts, updateProduct, deleteProduct } from '@/services/productService'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Search, Filter } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export default function AdminPage() {
    const t = useTranslations('Admin')
    const tCommon = useTranslations('Common')
    const tFilters = useTranslations('Admin.filters')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [isHot, setIsHot] = useState<string>('all')
    const [isFlashSale, setIsFlashSale] = useState<string>('all')
    const [status, setStatus] = useState<string>('all')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 12

    const fetchProducts = async () => {
        setLoading(true)
        try {
            // @ts-ignore
            const { data: products, total } = await getProducts(true, page, limit, {
                search: searchTerm,
                category: (category as 'new' | 'second_hand' | 'standard') || undefined,
                isHot: isHot === 'all' ? undefined : isHot === 'true',
                isFlashSale: isFlashSale === 'all' ? undefined : isFlashSale === 'true',
                isActive: status === 'all' ? undefined : status === 'active'
            })
            setProducts(products)
            setTotal(total)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts()
        }, 300)
        return () => clearTimeout(timer)
    }, [page, searchTerm, category, isHot, isFlashSale, status])

    const handleToggleStatus = async (product: Product) => {
        try {
            const newStatus = !product.is_active
            await updateProduct(product.id, { is_active: newStatus })
            setProducts(prev => prev.map(p => p.id === product.id ? { ...p, is_active: newStatus } : p))
        } catch (error) {
            console.error('Failed to toggle status', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return
        try {
            await deleteProduct(id)
            setProducts(prev => prev.filter(p => p.id !== id))
            setTotal(prev => prev - 1)
        } catch (error) {
            console.error('Failed to delete', error)
        }
    }

    const totalPages = Math.ceil(total / limit)

    if (loading && products.length === 0) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{t('products')}</h1>
                        <p className="text-slate-500 text-sm mt-1">{t('subtitle')}</p>
                    </div>
                    <Link href="/admin/new" className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition shadow-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        {t('addProduct')}
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col lg:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full lg:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={tFilters('searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setPage(1) // Reset to page 1 on search
                            }}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
                        <div className="relative w-full">
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    setPage(1)
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="">{tFilters('allCategories')}</option>
                                <option value="standard">Standard</option>
                                <option value="new">New Arrival</option>
                                <option value="second_hand">Second Hand</option>
                            </select>
                        </div>

                        <div className="relative w-full">
                            <select
                                value={isHot}
                                onChange={(e) => {
                                    setIsHot(e.target.value)
                                    setPage(1)
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="all">{tFilters('hot')}</option>
                                <option value="true">{tFilters('yes')}</option>
                                <option value="false">{tFilters('no')}</option>
                            </select>
                        </div>

                        <div className="relative w-full">
                            <select
                                value={isFlashSale}
                                onChange={(e) => {
                                    setIsFlashSale(e.target.value)
                                    setPage(1)
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="all">{tFilters('flashSale')}</option>
                                <option value="true">{tFilters('yes')}</option>
                                <option value="false">{tFilters('no')}</option>
                            </select>
                        </div>

                        <div className="relative w-full">
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value)
                                    setPage(1)
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="all">{tFilters('status')}</option>
                                <option value="active">{tFilters('active')}</option>
                                <option value="hidden">{tFilters('hidden')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {products.length === 0 && !loading ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="inline-flex p-3 bg-slate-50 rounded-full mb-3">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-slate-500">{tFilters('noResults') || 'No products found matching your search.'}</p>
                    </div>
                ) : (
                    <>


                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {products.map(product => (
                                <div key={product.id} className="relative group">
                                    <div className={`transition-opacity duration-200 ${!product.is_active ? 'opacity-50 grayscale' : ''}`}>
                                        <ProductCard product={product} />
                                    </div>

                                    {/* Admin Actions Overlay */}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/${product.id}`}
                                                className="inline-flex items-center justify-center w-10 h-10 bg-white text-slate-900 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg transform hover:scale-110"
                                                title="Edit Product"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleToggleStatus(product)
                                                }}
                                                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg transform hover:scale-110 ${product.is_active
                                                    ? 'bg-white text-emerald-600 hover:bg-emerald-500 hover:text-white'
                                                    : 'bg-slate-700 text-slate-300 hover:bg-emerald-500 hover:text-white'
                                                    }`}
                                                title={product.is_active ? "Hide Product" : "Show Product"}
                                            >
                                                {product.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleDelete(product.id)
                                                }}
                                                className="inline-flex items-center justify-center w-10 h-10 bg-white text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-lg transform hover:scale-110"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded-full">
                                            {product.is_active ? tFilters('active') : tFilters('hidden')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1 rounded-md border border-slate-200 text-sm font-medium text-slate-600 disabled:opacity-50 hover:bg-slate-50"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-slate-600">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1 rounded-md border border-slate-200 text-sm font-medium text-slate-600 disabled:opacity-50 hover:bg-slate-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
