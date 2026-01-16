'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import { getProducts, updateProduct, deleteProduct } from '@/services/productService'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Search, Filter } from 'lucide-react'

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchProducts = async () => {
        try {
            const data = await getProducts(true) // true = isAdmin
            setProducts(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

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
        } catch (error) {
            console.error('Failed to delete', error)
        }
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your inventory and visibility.</p>
                    </div>
                    <Link href="/admin/new" className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition shadow-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                        />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="inline-flex p-3 bg-slate-50 rounded-full mb-3">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-slate-500">No products found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
                                {/* Image Area */}
                                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400 text-sm">No Image</div>
                                    )}

                                    <div className="absolute top-2 right-2">
                                        <button
                                            onClick={() => handleToggleStatus(product)}
                                            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${product.is_active
                                                    ? 'bg-white/90 text-emerald-600 hover:bg-white'
                                                    : 'bg-slate-900/90 text-white hover:bg-slate-800'
                                                }`}
                                            title={product.is_active ? "Active (Click to Hide)" : "Hidden (Click to Show)"}
                                        >
                                            {product.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-semibold text-slate-900 line-clamp-1" title={product.name}>{product.name}</h3>
                                        </div>
                                        <p className="text-lg font-bold text-slate-900">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                        </p>
                                        <p className="text-sm text-slate-500 line-clamp-2 mt-2 h-10">
                                            {product.description || 'No description'}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-50">
                                        <Link
                                            href={`/admin/${product.id}`}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-slate-50 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-100 transition"
                                        >
                                            <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="inline-flex items-center justify-center p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                                            title="Delete Product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
