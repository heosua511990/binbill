'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { createProduct, updateProduct, uploadImage } from '@/services/productService'
import { Loader2, Upload, Eye, Save, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface ProductFormProps {
    initialData?: Product
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        original_price: 0,
        description: '',
        image_url: '',
        category: 'standard',
        condition: '',
        is_hot: false,
        is_active: true,
        ...initialData
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        // @ts-ignore
        const checked = e.target.checked
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : type === 'checkbox' ? checked : value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        try {
            setUploading(true)
            const file = e.target.files[0]
            const url = await uploadImage(file)
            setFormData(prev => ({ ...prev, image_url: url }))
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (initialData?.id) {
                await updateProduct(initialData.id, formData)
            } else {
                await createProduct(formData)
            }
            router.push('/admin')
            router.refresh()
        } catch (error) {
            console.error('Save failed:', error)
            alert('Save failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

            {/* Image Upload Section */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Product Image</label>
                <div className="flex items-start gap-6">
                    <div className="relative group w-40 h-40 rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center transition-colors hover:border-blue-400 hover:bg-blue-50/50">
                        {formData.image_url ? (
                            <>
                                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">Change Image</span>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-4">
                                <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                <span className="text-xs text-slate-400">No image</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="flex-1 pt-2">
                        <h4 className="text-sm font-medium text-slate-900 mb-1">Upload Photo</h4>
                        <p className="text-xs text-slate-500 mb-4">
                            Drag and drop or click to upload. Recommended size: 800x800px.
                        </p>
                        {uploading && (
                            <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                                <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                        placeholder="e.g. Premium Leather Bag"
                    />
                </div>

                {/* Price & Original Price */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Price (VND)</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                                ₫
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Original Price <span className="text-slate-400 font-normal">(Optional)</span></label>
                        <div className="relative">
                            <input
                                type="number"
                                name="original_price"
                                min="0"
                                value={formData.original_price || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                                placeholder="For sale calculation"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
                                ₫
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category & Hot Status */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category || 'standard'}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                        >
                            <option value="standard">Standard</option>
                            <option value="new">New Arrival</option>
                            <option value="sale">On Sale</option>
                            <option value="second_hand">Second Hand</option>
                        </select>
                    </div>

                    <div className="flex items-center h-full pt-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="is_hot"
                                    checked={formData.is_hot || false}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">Mark as Hot / Recommended</span>
                        </label>
                    </div>
                </div>

                {/* Condition (Only for Second Hand) */}
                {formData.category === 'second_hand' && (
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Condition</label>
                        <input
                            type="text"
                            name="condition"
                            value={formData.condition || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            placeholder="e.g. Like New, 99%, 95%, Good Condition"
                        />
                    </div>
                )}

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none"
                        placeholder="Describe your product..."
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                <Link href="/admin" className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    Cancel
                </Link>

                <div className="flex items-center gap-3">
                    {initialData?.id && (
                        <Link href={`/product/${initialData.id}`} target="_blank" className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                            Preview
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    )
}
